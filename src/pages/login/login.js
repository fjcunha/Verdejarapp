var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { NewaccountPage } from '../newaccount/newaccount';
import { UsuarioProvider } from '../../providers/usuario/usuario';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, menuCtrl, customerProvider, toastController, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.customerProvider = customerProvider;
        this.toastController = toastController;
        this.loadingCtrl = loadingCtrl;
        this._customer = {
            email: '',
            password: '',
            token: ''
        };
        this.customerProvider.GetStorage('tokenEpic').then(function (val) {
            if (val) {
                _this.presentLoading();
                _this.customerProvider.SetStorage('tokenEpic', null);
                _this.menuCtrl.enable(false, 'auth');
                _this.menuCtrl.enable(true, 'unauth');
                _this.dismissLoading();
                _this.navCtrl.setRoot(LoginPage_1);
            }
        });
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.registerLink = function (param) {
        this.navCtrl.push(NewaccountPage, { param: param });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.presentLoading();
        this.customerProvider.loginCustomer(this._customer).subscribe(function (res) {
            _this._customer.token = res;
            console.log(res);
            /*this.customerProvider.SetStorage('tokenEpic', this._customer);
            this.menuCtrl.enable(true, 'auth');
            this.menuCtrl.enable(false, 'unauth');
            this.dismissLoading();
            this.navCtrl.setRoot(HomePage);*/
        }, function (erro) {
            _this.dismissLoading();
            _this.presentToast(erro.error, 'middle');
        });
    };
    LoginPage.prototype.presentToast = function (msg, pPosition) {
        var toast = this.toastController.create({
            message: msg,
            duration: 3000,
            position: pPosition
        });
        toast.present();
    };
    LoginPage.prototype.presentLoading = function () {
        if (!this.loading) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    LoginPage.prototype.dismissLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    LoginPage = LoginPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            MenuController, UsuarioProvider,
            ToastController, LoadingController])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map