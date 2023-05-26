/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

/* global Select2 */

/**
 * Select2 extension for toggling values in a multi-select dropdown
 */
(function(Select2) {

	console.log("function(Select2)");
	console.log("Select2", Select2);
	console.log("this.container", this.container);

	var Select2FindHighlightableChoices = Select2.class.multi.prototype.findHighlightableChoices;
	Select2.class.multi.prototype.findHighlightableChoices = function () {
		if (this.opts.toggleSelect) {
			return this.results.find('.select2-result-selectable:not(.select2-disabled)');
		}
		return Select2FindHighlightableChoices.apply(this, arguments);
	};

	var Select2TriggerSelect = Select2.class.multi.prototype.triggerSelect;
	Select2.class.multi.prototype.triggerSelect = function (data) {
		console.log("Select2.class.multi.prototype.triggerSelect", Select2.class.multi.prototype.triggerSelect);
		console.log("data", data);
		console.log("this", this);
		console.log("this.id(data)", this.id(data));
		console.log("this.opts", this.opts);
		console.log("this.opts.toggleSelect", this.opts.toggleSelect);
		// variable Select2 is global => great!!!

		// call api của Sơn để get list tags: 1year, 3year, 5year, forever
		// check whether value in this list tags
		// if yes => preventing choosing OR choosing the new one and de-select the old one
		// if no => select normally

		console.log("preventModifyingSpecialTags", preventModifyingSpecialTags);
		console.log(`$(".select2-container")`, $(".select2-container"));
		

		// const listTagLabels = ["1y", "5y", "10y", "unlimited"];
		console.log(`$(".select2-results > li.select2-result")`, $(".select2-results > li.select2-result"));
		
		if(["1y", "5y", "10y", "unlimited"].includes(data.name.trim())) {
			return false;
		}

		if (this.opts.toggleSelect && this.val().indexOf(this.id(data)) !== -1) {
			var self = this;
			var val = this.id(data);
			console.log("this.container", this.container);

			var selectionEls = this.container.find('.select2-search-choice').filter(function() {
				return (self.id($(this).data('select2-data')) === val);
			});

			if (this.unselect(selectionEls)) {
				// also unselect in dropdown
				this.results.find('.select2-result.select2-selected').each(function () {
					var $this = $(this);
					if (self.id($this.data('select2-data')) === val) {
						$this.removeClass('select2-selected');
					}
				});
				this.clearSearch();
			}
			setSpecialTagsPrivileges();
			return false;
		} else {
			setSpecialTagsPrivileges();
			return Select2TriggerSelect.apply(this, arguments);
		}
	};

})(Select2);

