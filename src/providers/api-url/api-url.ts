import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiUrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUrlProvider {
  
  private static SERVER_URL = "http://intelprog-001-site13.btempurl.com/api/";
  private static LOCAL_IP = "http://192.168.100.6/verdejarweb/api/";
  private static ACCESS_TOKEN = "a94aaff5737e7d153dd7302a80ecaf7d";

  public static readonly PROD:boolean = true;
  public static readonly DEPLOY:boolean = true;

  private static SERVER_BASE = ApiUrlProvider.PROD ? "http://intelprog-001-site13.btempurl.com/" : 
                                                    "http://192.168.100.6/verdejarweb/";
  public static readonly TIMEOUT:number = 20000;

  public static GetUrl():string{
    if(ApiUrlProvider.DEPLOY){
      return ApiUrlProvider.PROD ? ApiUrlProvider.SERVER_URL : ApiUrlProvider.LOCAL_IP;
    }else{
      return ApiUrlProvider.PROD ? "http://localhost:8100/prodapi/" : "http://localhost:8100/api/";
    }
  }

  public static GetToken():string{
    return this.ACCESS_TOKEN;
  }

  public static GetImageBase():string{
    return this.SERVER_BASE;
  }

}
