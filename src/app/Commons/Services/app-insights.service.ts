import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {


  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: environment.appInsights.instrumentationKey,
    enableCorsCorrelation: true ,
    enableDebug: true,
    verboseLogging: true
 }

 constructor() {
   if(!AppInsights.config) {
     AppInsights.downloadAndSetup!(this.config);
   }
 }

 
 logPageView(name: string, url?: string, properties?: any, measurements?: any, duration?: number) {
   AppInsights.trackPageView(name, url, properties, measurements, duration);
 }
 logEvent(name: string, properties?: any, measurements?: any) {
   AppInsights.trackEvent(name, properties, measurements);
 }
 trackException(exception: Error) {
   AppInsights.trackException(exception);
 }

}