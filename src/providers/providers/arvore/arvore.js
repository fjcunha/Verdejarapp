var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ArvoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ArvoreProvider = /** @class */ (function () {
    function ArvoreProvider(http, _platform, storage) {
        this.http = http;
        this._platform = _platform;
        this.storage = storage;
        this.basepath = "/api";
        this.headers = new HttpHeaders();
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (this._platform.is("cordova")) {
            this.basepath = "http://mercado8.dlinkddns.com:8888/verdejar/public/api/arvore";
        }
    }
    ArvoreProvider.prototype.getAll = function () {
        var url = this.basepath + "/arvore/";
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('id_seller', '10e1745f-2702-4121-b3ad-32623d1fd4df')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return this.http.get(url, { headers: this.headers });
    };
    ArvoreProvider.prototype.getConfig = function () {
        var url = this.basepath + "/config/";
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return this.http.get(url, { headers: this.headers });
    };
    ArvoreProvider.prototype.get = function (id) {
        var url = this.basepath + "/arvore/" + id;
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return this.http.get(url, { headers: this.headers });
    };
    ArvoreProvider.prototype.getEspecieAll = function () {
        var url = this.basepath + "/especie/";
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('id_seller', '10e1745f-2702-4121-b3ad-32623d1fd4df')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return this.http.get(url, { headers: this.headers });
    };
    ArvoreProvider.prototype.getEspecie = function (id) {
        var url = this.basepath + "/especie/" + id;
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('id_seller', '10e1745f-2702-4121-b3ad-32623d1fd4df')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return this.http.get(url, { headers: this.headers });
    };
    //cria o storage local
    ArvoreProvider.prototype.SetStorage = function (key, value) {
        this.storage.set(key, value); //seta o nome e valor
        return this.storage;
    };
    //busca o storage local
    ArvoreProvider.prototype.GetStorage = function (key) {
        return this.storage.get(key);
    };
    ArvoreProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Platform, Storage])
    ], ArvoreProvider);
    return ArvoreProvider;
}());
export { ArvoreProvider };
//# sourceMappingURL=arvore.js.map