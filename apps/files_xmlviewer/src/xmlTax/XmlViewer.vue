<!--
 - @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 -
 - @author John Molakvoæ <skjnldsv@protonmail.com>
 -
 - @license AGPL-3.0-or-later
 -
 - This program is free software: you can redistribute it and/or modify
 - it under the terms of the GNU Affero General Public License as
 - published by the Free Software Foundation, either version 3 of the
 - License, or (at your option) any later version.
 -
 - This program is distributed in the hope that it will be useful,
 - but WITHOUT ANY WARRANTY; without even the implied warranty of
 - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 - GNU Affero General Public License for more details.
 -
 - You should have received a copy of the GNU Affero General Public License
 - along with this program. If not, see <http://www.gnu.org/licenses/>.
 -
 -->

<template>
  <div v-if="src && isLoaded" class="xml-viewer">
    <div class="content" v-if="isBill">
      <HeaderData :header="bill.header" />
      <TaxId :tax="bill.taxid" />
      <Saler :saler="bill.saler" />
      <Buyer :buyer="bill.buyer" />
      <ListingItem :listing="bill.listing" />
    </div>
    <div v-else class="content">{{ text }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "@nextcloud/axios";
import AsyncComputed from "vue-async-computed";
import { basename } from "@nextcloud/paths";
import { xml2json } from "xml-js";
import _get from "lodash/get";
import _find from "lodash/find";

import HeaderData from "./Header.vue";
import TaxId from "./TaxId.vue";
import Saler from "./Saler.vue";
import Buyer from "./Buyer.vue";
import ListingItem from "./Listing.vue";

Vue.use(AsyncComputed);

export default {
  name: "XmlViewer",
  components: {
    HeaderData,
    TaxId,
    Saler,
    Buyer,
    ListingItem,
  },
  data() {
    return {
      isBill: false,
      bill: {
        header: null,
        taxid: null,
        saler: null,
        buyer: null,
        listing: null,
      },
      text: null,
    };
  },

  computed: {
    src() {
      return this.source ?? this.davPath;
    },
  },
  async mounted() {
    try {
      const xmlData = await this.xmlData();
      if (typeof xmlData === "object") {
        const bill = xmlData.elements.find((e) => e.name === "HDon");
        if (bill) {
          this.bill = this._getBill(bill);
        }
      }
      if (typeof xmlData === "string") {
        this.text = xmlData;
      }
    } catch (error) {
      console.log({ errorViewer: error });
    } finally {
      this.doneLoading();
    }
  },

  methods: {
    onClose() {
      this.$emit("update:editing", false);
    },

    _getItemValue(name, elements) {
      return {
        name: t("viewer", name),
        value: _get(
          elements.find((e) => e.type === "text"),
          "text",
          ""
        ),
      };
    },

    _getTaxID(item) {
      const { elements, name } = item;
      return this._getItemValue(name, elements);
    },
    _getHeader(DLHDon) {
      const data = DLHDon.find((d) => d.name === "TTChung");
      if (data) {
        const { elements } = data;
        const result = elements.reduce((acc, e) => {
          const item = this._getItemValue(e.name, e.elements);
          [
            "KHMSHDon",
            "THDon",
            "KHHDon",
            "SHDon",
            "NLap",
            "MSTTCGP",
            "PBan",
          ].map((field) => {
            if (field === e.name) {
              acc[e.name] = item;
            } else {
              this._getItemValue(field, []);
            }
          });

          return acc;
        }, {});

        return {
          name: t("viewer", "TTChung"),
          items: result,
          value: "",
        };
      }
    },
    _getSaler(NBan) {
      const result = NBan.elements.reduce((acc, e) => {
        const { elements: items, name } = e;
        const item = this._getItemValue(name, items);
        if (["Ten", "MST", "DChi"].includes(name)) {
          acc[name] = item;
        }
        return acc;
      }, {});

      return {
        name: t("viewer", "NBan"),
        items: result,
        value: "",
      };
    },
    _getBuyer(NMua) {
      const result = NMua.elements.reduce((acc, e) => {
        const { elements: items, name } = e;
        const item = this._getItemValue(name, items);
        acc["NMua"] = this._getItemValue("NMua", []);
        acc["STK"] = this._getItemValue("STK", []);
        acc["HTTToan"] = this._getItemValue("HTTToan", []);
        if (["Ten", "MST", "DChi"].includes(name)) {
          acc[name] = item;
        }
        return acc;
      }, {});

      return {
        name: t("viewer", "NMua"),
        items: result,
        value: "",
      };
    },
    _getListing(HHDVu) {
      const result = HHDVu.elements.reduce((acc, e, i) => {
        const { elements: items, name } = e;
        if (name === "HHDVu") {
          acc[i] = items.reduce((accItem, item) => {
            const newItem = this._getItemValue(item.name, item.elements);
            [
              "TChat",
              "STT",
              "THHDVu",
              "SLuong",
              "DGia",
              "TLCKhau",
              "STCKhau",
              "ThTien",
              "TSuat",
            ].map((field) => {
              if (field === item.name) {
                accItem[[item.name]] = newItem;
              } else {
                accItem[[field]] = this._getItemValue(field, []);
              }
            });
            return accItem;
          }, {});
        }

        return acc;
      }, []);
      return {
        name: t("viewer", "HHDVu"),
        items: result,
        value: "DSHHDVu",
      };
    },
    _getPayInfo(TToan) {
      const result = TToan.elements.reduce(
        (acc, e) => {
          const { elements: items, name } = e;
          const item = {
            name: t("viewer", name),
            value: _get(
              items.find((e) => e.type === "text"),
              "text",
              ""
            ),
          };
          if (
            [
              "THTTLTSuat",
              "TgTCThue",
              "TgTThue",
              "TTCKTMai",
              "TgTTTBSo",
              "TgTTTBChu",
            ].includes(name)
          ) {
            acc[name] = item;
          }
          return acc;
        },
        {
          THTTLTSuat: null,
          TgTCThue: null,
          TgTThue: null,
          TTCKTMai: null,
          TgTTTBSo: null,
          TgTTTBChu: null,
        }
      );

      return {
        name: t("viewer", "TToan"),
        value: "",
        ...result,
      };
    },

    // Fallback to the original image if not already done
    onFail(event) {
      if (!this.fallback) {
        console.error(
          `Loading of file preview ${basename(
            this.src
          )} failed, falling back to original file`
        );
        this.fallback = true;
      }
    },
    _getBill(xmlData) {
      try {
        const items = _get(xmlData, "elements", []).reduce(
          (acc, item) => {
            if (item.name === "MCCQT") {
              acc.taxid = this._getTaxID(item);
            }

            if (item.name === "DLHDon") {
              acc.header = this._getHeader(item.elements);
              const NDHDon = item.elements.find((d) => d.name === "NDHDon");
              acc.saler = this._getSaler(
                NDHDon.elements.find((e) => e.name === "NBan")
              );
              acc.buyer = this._getBuyer(
                NDHDon.elements.find((e) => e.name === "NMua")
              );
              acc.listing = this._getListing(
                NDHDon.elements.find((e) => e.name === "DSHHDVu")
              );
              acc.listing["payInfo"] = this._getPayInfo(
                NDHDon.elements.find((e) => e.name === "TToan")
              );
            }

            return acc;
          },
          {
            header: null,
            taxid: null,
            saler: null,
            buyer: null,
            listing: null,
            payInfo: null,
          }
        );
        return items;
      } catch (error) {
        OCDialogs.message(error.message || "_getBill has error", "_getBill");
      }
    },
    async xmlData() {
      try {
        const { data } = await axios.get(this.src);
        if (data && data.includes("HDon")) {
          this.isBill = true;
          const xmlJson = xml2json(data, {
            compact: false,
            spaces: 4,
            nativeType: true,
          });
          return typeof JSON.parse(xmlJson) === "object"
            ? JSON.parse(xmlJson)
            : data;
        } else {
          return data;
        }
      } catch (error) {
        console.log({ xmlData: error });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.viewer__content {
  padding: 15px;
}
.xml-viewer {
  background: #fff;
  max-width: 1024px;
  padding: 15px;
  .content {
    border: 1px solid currentColor;
    ul {
      padding: 15px;
      border-bottom: 1px solid currentColor;
      ul {
        border-bottom: none;
      }
      li {
        display: inline;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      white-space: unset;
      tr {
        td,
        th {
          border: 1px solid currentColor;
          &:first-child {
            border-left: none;
          }
          &:last-child {
            border-right: none;
          }
          padding: 15px;
          color: #000;
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
        th {
          border-top: none;
        }
      }
    }
  }
}
</style>
