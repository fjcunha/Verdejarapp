var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider(http, _platform, storage) {
        this.http = http;
        this._platform = _platform;
        this.storage = storage;
        this.basepath = "/api";
        this.headers = new HttpHeaders();
        /*
        * Cria uma tabela dentro do bd do dispositivo
        **/
        this.headers = new HttpHeaders()
            .set("X-CustomHeader", "custom header value")
            .set('Content-Type', 'application/json; charset=utf-8')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (this._platform.is("cordova")) {
            this.basepath = "http://mercado8.dlinkddns.com/verdejar/public/api/";
        }
    }
    //cria o storage local
    UsuarioProvider.prototype.SetStorage = function (key, value) {
        this.storage.set(key, value); //seta o nome e valor
        return this.storage;
    };
    //busca o storage local
    UsuarioProvider.prototype.GetStorage = function (key) {
        return this.storage.get(key);
    };
    UsuarioProvider.prototype.loginCustomer = function (data) {
        var url = this.basepath + "/login";
        return this.http.post(url, data, { headers: this.headers });
    };
    UsuarioProvider.prototype.UserData = function (data) {
        this.headers = new HttpHeaders()
            .set("X-CustomHeader", "custom header value")
            .set('Content-Type', 'application/json; charset=utf-8')
            .set("cache-control", "no-cache")
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var url = this.basepath + "/user";
        return this.http.post(url, data, { headers: this.headers });
    };
    UsuarioProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Platform, Storage])
    ], UsuarioProvider);
    return UsuarioProvider;
}());
export { UsuarioProvider };
//# sourceMappingURL=usuario.js.map