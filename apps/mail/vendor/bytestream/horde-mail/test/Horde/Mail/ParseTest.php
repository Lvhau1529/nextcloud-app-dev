<?php
/**
 * @author     Michael Slusarz <slusarz@horde.org>
 * @license    http://www.horde.org/licenses/bsd BSD
 * @category   Horde
 * @package    Mail
 * @subpackage UnitTests
 */

class Horde_Mail_ParseTest extends \PHPUnit\Framework\TestCase
{
    private $rfc822;

    public function setUp(): void
    {
        parent::setUp();
        $this->rfc822 = new Horde_Mail_Rfc822();
    }

    /* Test case for PEAR Mail:: bug #13659 */
    public function testParseBug13659()
    {
        $address = '"Test Student" <test@mydomain.com> (test)';

        $result = $this->rfc822->parseAddressList($address, array(
           'default_domain' => 'anydomain.com'
        ));

        $this->assertTrue($result instanceof Horde_Mail_Rfc822_List);

        $ob = $result[0];

        $this->assertTrue($ob instanceof Horde_Mail_Rfc822_Address);
        $this->assertEquals(
            'Test Student',
            $ob->personal
        );
        $this->assertEquals(
            'test',
            $ob->mailbox
        );
        $this->assertEquals(
            'mydomain.com',
            $ob->host
        );
        $this->assertIsArray(
            $ob->comment
        );
        $this->assertEquals(
            1,
            count($ob->comment)
        );
        $this->assertEquals(
            'test',
            $ob->comment[0]
        );
    }

    /**
     * Test case for PEAR Mail:: bug #9137
     *
     * @dataProvider parseBug9137Provider
     * */
    public function testParseBug9137($name, $email)
    {
        /* Throws Exception on error. */
        $this->rfc822->parseAddressList(
            '"' . addslashes($name) . '" <' . $email . '>'
        );
    }

    public function parseBug9137Provider()
    {
        return array(
            array('John Doe', 'test@example.com'),
            array('John Doe\\', 'test@example.com'),
            array('John "Doe', 'test@example.com'),
            array('John "Doe\\', 'test@example.com')
        );
    }

    /**
     * Test case for PEAR Mail:: bug #9137, take 2
     *
     * @dataProvider parseBug9137Take2Provider
     */
    public function testParseBug9137Take2($raw, $fail)
    {
        try {
            $this->rfc822->parseAddressList($raw, array(
                'validate' => true
            ));
            if ($fail) {
                $this->fail('An expected exception was not raised.');
            }
        } catch (Horde_Mail_Exception $e) {
            if (!$fail) {
                $this->fail('An unexpected exception was raised.');
            }
        }
    }

    public function parseBug9137Take2Provider()
    {
        return array(
            array('"John Doe" <test@example.com>', false),
            array('"John Doe' . chr(92) . '" <test@example.com>', true),
            array('"John Doe' . chr(92) . chr(92) . '" <test@example.com>', false),
            array('"John Doe' . chr(92) . chr(92) . chr(92) . '" <test@example.com>', true),
            array('"John Doe' . chr(92) . chr(92) . chr(92) . chr(92) . '" <test@example.com>', false),
            array('"John Doe <test@example.com>', true)
        );
    }

    public function testGeneralParsing()
    {
        /* A simple, bare address. */
        $address = 'user@example.com';
        $result = $this->rfc822->parseAddressList($address, array(
            'default_domain' => null
        ));

        $this->assertTrue($result instanceof Horde_Mail_Rfc822_List);
        $this->assertTrue($result[0] instanceof Horde_Mail_Rfc822_Address);
        $this->assertEquals($result[0]->personal, '');
        $this->assertIsArray($result[0]->comment);
        $this->assertEquals($result[0]->comment, array());
        $this->assertEquals($result[0]->mailbox, 'user');
        $this->assertEquals($result[0]->host, 'example.com');

        /* Address groups. */
        $address = 'My Group: "Richard" <richard@example.com> (A comment), ted@example.com (Ted Bloggs), Barney;';
        $result = $this->rfc822->parseAddressList($address, array(
            'default_domain' => null
        ));

        $this->assertTrue($result instanceof Horde_Mail_Rfc822_List);
        $this->assertTrue($result[0] instanceof Horde_Mail_Rfc822_Group);
        $this->assertEquals($result[0]->groupname, 'My Group');
        $this->assertTrue($result[0]->addresses instanceof Horde_Mail_Rfc822_GroupList);
        $this->assertEquals(0, $result[0]->addresses->groupCount());

        $this->assertIsObject($result[0]->addresses[0]);
        $this->assertEquals($result[0]->addresses[0]->personal, 'Richard');
        $this->assertIsArray($result[0]->addresses[0]->comment);
        $this->assertEquals($result[0]->addresses[0]->comment[0], 'A comment');
        $this->assertEquals($result[0]->addresses[0]->mailbox, 'richard');
        $this->assertEquals($result[0]->addresses[0]->host, 'example.com');

        $this->assertIsObject($result[0]->addresses[1]);
        $this->assertEquals($result[0]->addresses[1]->personal, '');
        $this->assertIsArray($result[0]->addresses[1]->comment);
        $this->assertEquals($result[0]->addresses[1]->comment[0], 'Ted Bloggs');
        $this->assertEquals($result[0]->addresses[1]->mailbox, 'ted');
        $this->assertEquals($result[0]->addresses[1]->host, 'example.com');

        $this->assertIsObject($result[0]->addresses[2]);
        $this->assertEquals($result[0]->addresses[2]->personal, '');
        $this->assertIsArray($result[0]->addresses[2]->comment);
        $this->assertEquals($result[0]->addresses[2]->comment, array());
        $this->assertEquals($result[0]->addresses[2]->mailbox, 'Barney');
        $this->assertEmpty($result[0]->addresses[2]->host);

        /* A valid address with spaces in the local part. */
        $address = '<"Jon Parise"@php.net>';
        $result = $this->rfc822->parseAddressList($address, array(
            'default_domain' => null
        ));

        $this->assertTrue($result instanceof Horde_Mail_Rfc822_List);
        $this->assertTrue($result[0] instanceof Horde_Mail_Rfc822_Address);
        $this->assertEquals($result[0]->personal, '');
        $this->assertIsArray($result[0]->comment);
        $this->assertEquals($result[0]->comment, array());
        $this->assertEquals($result[0]->mailbox, 'Jon Parise');
        $this->assertEquals($result[0]->host, 'php.net');

        /* An invalid address with spaces in the local part. */
        $address = '<Jon Parise@php.net>';
        try {
            $this->rfc822->parseAddressList($address, array(
                'validate' => true
            ));
            $this->fail('An expected exception was not raised.');
        } catch (Horde_Mail_Exception $e) {}

        /* A valid address with an uncommon TLD. */
        $address = 'jon@host.longtld';
        try {
            $this->rfc822->parseAddressList($address, array(
                'validate' => true
            ));
        } catch (Horde_Mail_Exception $e) {
            $this->fail('An unexpected exception was raised.');
        }
    }

    public function testValidateQuotedString()
    {
        $address_string = '"Joe Doe \(from Somewhere\)" <doe@example.com>, postmaster@example.com, root';

        $res = $this->rfc822->parseAddressList($address_string, array(
            'default_domain' => 'example.com'
        ));
        $this->assertTrue($res instanceof Horde_Mail_Rfc822_List);
        $this->assertEquals(count($res), 3);
    }

    public function testBug9525()
    {
        try {
            $ob = $this->rfc822->parseAddressList(
                'ß <test@example.com>',
                array(
                    'default_domain' => 'example.com',
                    'validate' => true
                )
            );

            $this->fail('Expecting Exception.');
        } catch (Horde_Mail_Exception $e) {}

        /* This technically shouldn't validate, but the parser is very liberal
         * about accepting characters within quotes. */
        $ob = $this->rfc822->parseAddressList(
            '"ß" <test@example.com>',
            array(
                'default_domain' => 'example.com'
            )
        );
    }

    public function testBug10534()
    {
        $ob = $this->rfc822->parseAddressList('');

        $this->assertEquals(
            0,
            count($ob)
        );
    }

    public function testNoValidation()
    {
        $ob = $this->rfc822->parseAddressList(
            '"ß" <test@example.com>',
            array(
                'default_domain' => 'example.com'
            )
        );

        $this->assertEquals(
            'ß',
            $ob[0]->personal
        );

        $ob = $this->rfc822->parseAddressList(
            'ß ß <test@example.com>',
            array(
                'default_domain' => 'example.com'
            )
        );

        $this->assertEquals(
            'ß ß',
            $ob[0]->personal
        );
    }

    public function testLimit()
    {
        $email = array_fill(0, 10, 'A <foo@example.com>');

        $ob = $this->rfc822->parseAddressList(
            implode(', ', $email),
            array(
                'limit' => 5
            )
        );

        $this->assertEquals(
            5,
            count($ob)
        );
    }

    public function testMissingMailboxInNonValidateMode()
    {
        $email = 'A <example.com>';

        $ob = $this->rfc822->parseAddressList($email);

        /* This can't work even in non-validate mode; since there is no hope
         * that something like encoding will fix in the future. */
        $this->assertEquals(
            0,
            count($ob)
        );
    }

    public function testMissingAddressWhenParsingGroupInNonValidateMode()
    {
        $email = 'Group: foo@example.com, A;';

        $ob = $this->rfc822->parseAddressList($email);

        $this->assertEquals(
            2,
            count($ob[0]->addresses)
        );
    }

    public function testParseGroupWhenNotValidating()
    {
        $email = 'Group: foo@example.com, foo2@example.com;';

        $ob = $this->rfc822->parseAddressList($email);

        $this->assertEquals(
            2,
            count($ob[0]->addresses)
        );
    }

    public function testLargeParse()
    {
        $email = array_fill(0, 1000, 'A <foo@example.com>, "A B" <foo@example.com>, foo@example.com, Group: A <foo@example.com>;, Group2: "A B" <foo@example.com>;');

        $ob = $this->rfc822->parseAddressList(implode(', ', $email));

        $this->assertEquals(
            5000,
            count($ob)
        );
    }

    public function testArrayAccess()
    {
        $ob = $this->rfc822->parseAddressList(
            'A <test@example.com>',
            array(
                'default_domain' => 'example.com'
            )
        );

        $this->assertEquals(
            'A',
            $ob[0]->personal
        );

        $this->assertEquals(
            'example.com',
            $ob[0]->host
        );

        $this->assertTrue(
            isset($ob[0]->mailbox)
        );

        $this->assertFalse(
            isset($ob[0]->bar)
        );
    }

    public function testEmailInDisplayPart()
    {
        $ob = $this->rfc822->parseAddressList(
            'Foo Bar <foobar@example.com>, "bad_email@example.com, Baz" <baz@example.com>, "Qux" <qux@example.com>'
        );

        $this->assertEquals(
            3,
            count($ob)
        );
    }

    public function testValidation()
    {
        $ob = $this->rfc822->parseAddressList(
            '"Tek-Diária - Newsletter" <foo@example.com>'
        );

        $this->assertEquals(
            1,
            count($ob)
        );
    }

    /**
     * @dataProvider utf8CharactersInAddressProvider
     */
    public function testUtf8CharactersInAddress($address, $valid_eai)
    {
        $ob = $this->rfc822->parseAddressList($address);

        $this->assertEquals(
            1,
            count($ob)
        );

        try {
            $this->rfc822->parseAddressList($address, array(
                'validate' => true
            ));
            $this->fail('Expected Exception.');
        } catch (Horde_Mail_Exception $e) {}

        try {
            $this->rfc822->parseAddressList($address, array(
                'validate' => 'eai'
            ));
            if (!$valid_eai) {
                $this->fail('Expected Exception.');
            }
        } catch (Horde_Mail_Exception $e) {
            if ($valid_eai) {
                $this->fail('Not expecting Exception.');
            }
        }
    }

    public function utf8CharactersInAddressProvider()
    {
        return array(
            array('fooççç@example.com', true),
            array('Jøran Øygårdvær <jøran@example.com>', true),
            array('foo@üexample.com', true),
            array('foo"ççç@example.com', false),
            array('Jøran Øygårdvær <jør[an@example.com>', false),
            array('f\10oo@üexample.com', false)
        );
    }

    public function testParsingNonValidateAddressWithBareAddressAtFront()
    {
        $address = 'test@example.com, Foo <test2@example.com>';

        $ob = $this->rfc822->parseAddressList($address);

        $this->assertEquals(
            2,
            count($ob)
        );

        $this->assertEquals(
            'example.com',
            $ob[0]->host
        );
    }

    public function testParsingIDNHost()
    {
        $email = 'Aäb <test@üexample.com>';

        $ob = $this->rfc822->parseAddressList($email);

        $this->assertEquals(
            1,
            count($ob)
        );
        $this->assertEquals(
            'üexample.com',
            $ob[0]->host
        );

        try {
            $this->rfc822->parseAddressList($email, array(
                'validate' => true
            ));
            $this->fail('Expected Exception');
        } catch (Exception $e) {}
    }

    public function testParsingSimpleString()
    {
        $email = 'Test';

        $ob = $this->rfc822->parseAddressList($email);

        $this->assertEquals(
            1,
            count($ob)
        );

        $this->assertEquals(
            $email,
            $ob[0]->mailbox
        );

        $this->assertEquals(
            $email,
            (string)$ob[0]
        );
    }

    public function testParsingPersonalPartWithQuotes()
    {
        $email = '"Test \\"F-oo\\" Bar" <foo@example.com>';

        $ob = new Horde_Mail_Rfc822_Address($email);

        $this->assertEquals(
            '"Test \"F-oo\" Bar" <foo@example.com>',
            $ob->writeAddress()
        );

        $this->assertEquals(
            $email,
            $ob->writeAddress(true)
        );
    }

    public function testParsingPersonalPartWithCommas()
    {
        $email = "\"Foo, Bar\" <foo@example.com>";

        $ob = $this->rfc822->parseAddressList($email);

        $this->assertEquals(
            $email,
            $ob->writeAddress(true)
        );

        $ob = $this->rfc822->parseAddressList($email, array(
            'validate' => true
        ));

        $this->assertEquals(
            $email,
            $ob->writeAddress(true)
        );
    }

    public function testParseOfGroupObject()
    {
        $email = 'Test: foo@example.com, bar@example.com;';
        $ob = $this->rfc822->parseAddressList($email);
        $ob2 = $this->rfc822->parseAddressList($ob);

        $this->assertEquals(
            2,
            count($ob2)
        );
    }

    public function testDefaultDomain()
    {
        $address = 'foo@example2.com';
        $result = $this->rfc822->parseAddressList($address, array(
           'default_domain' => 'example.com'
        ));

        $this->assertEquals(
            'foo@example2.com',
            strval($result)
        );

        $address = 'foo';
        $result = $this->rfc822->parseAddressList($address, array(
           'default_domain' => 'example.com'
        ));

        $this->assertEquals(
            'foo@example.com',
            strval($result)
        );
    }

    /**
     * @dataProvider bareMailboxWithoutDefaultDomainProvider
     */
    public function testBareMailboxWithoutDefaultDomainWithoutValidating($addr)
    {
        $res = $this->rfc822->parseAddressList($addr, array(
            'default_domain' => null
        ));

        $this->assertEquals(
             'foo',
            $res[0]->mailbox
        );
        $this->assertNull($res[0]->host);
    }

    /**
     * @dataProvider bareMailboxWithoutDefaultDomainProvider
     */
    public function testBareMailboxWithoutDefaultDomainWhenValidating($addr)
    {
        try {
            $this->rfc822->parseAddressList($addr, array(
                'default_domain' => null,
                'validate' => true
            ));
            $this->fail('An expected exception was not raised.');
        } catch (Horde_Mail_Exception $e) {}
    }

    public function bareMailboxWithoutDefaultDomainProvider()
    {
        return array(
            array('foo'),
            array('foo@')
        );
    }

}
