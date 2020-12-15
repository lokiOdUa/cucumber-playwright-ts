import {Given} from 'cucumber'
import { base } from '../utils/base'
import { page } from '../utils/page'
import { RootPageObject as root } from '../page_objects/RootPageObject'
import { IndexPage as index } from "../page_objects/pages/IndexPage";
import {Then} from 'cucumber'
const chai = require('chai')
const assert = chai.assert

let BASE_URL: string = "https://petstore.octoperf.com/";

Given(
    /^открыть стартовую страницу сайта$/,
    { timeout: 75 * 1000 },
    async function () {
        await root.gotoAndWait(BASE_URL, "Открываем стартовую страницу");
        assert.equal(await index.getLinkText(), "Enter the Store",
            "Текст ссылки не сответствует ожидаемому")
});

Given(
    /^открыть "([^"]*)" страницу сайта$/,
    { timeout: 75 * 1000 },
    async function (addr: string) {
        let url: string = BASE_URL + addr;
        await root.gotoAndWait(url, "Открываем страницу: " + url);
    });

Given(
    /^прервать тест с ошибкой$/,
    function () {
    assert.fail("Тест прерван с ошибкой (just as planned)")
    });

Given(
    /^перейти по ссылке с главной страницы сайта$/,
    async function () {
        await index.clickLink()
    });

Then(
    /^число ссылок на каталог должно быть "([^"]*)"$/,
    async function (amount: string) {
        assert.equal((await index.getNumberOfCatalogLinks()).toString(), amount,
            "Число ссылок на каталог со страницы не соответствует ожидаемому")
    });
