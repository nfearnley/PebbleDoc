// EMBEDDED APP INFO
//var app_info_inline =
//{
//    "info": {
//        "uuid": "2730F826-0001-4C7E-8E45-40FBA0CF5676",
//        "shortName": "BuiltInTest",
//        "longName": "BuiltInTest",
//        "versionLabel": "1.0.1",
//        "versionCode": 100,
//        "system": {
//            "property_set":["builtin" , "debug_only"]
//        }
//    },
//    "appKeys": {
//        "key": value
//    }
//}

// CALLBACK EVENT OBJECT
//  callback(e)
//      e = document.createEvent('Event');
//      e.type =
//          "appmessage_ack"
//              e.payload = JSON.parse(data);
//              e.data = e.payload;
//              e.data.transactionId;
//          "appmessage_nack"
//              e.payload = JSON.parse(data);
//              e.data = e.payload;
//              e.data.transactionId;
//          "ready"
//              e.ready = data;
//              e.data = data;
//          "appmessage"
//              e.payload = JSON.parse(data);
//              e.data = e.payload;
//          "showConfiguration"
//              e.payload = JSON.parse(data);
//              e.data = e.payload;
//          "webviewclosed"
//              e.response = decodeURIComponent(data);
//              e.data = decodeURIComponent(data);
//          "webviewopened"
//              e.opened = data;
//              e.data = data;
//          "settings_webui_allowed" // deprecated, use showConfiguration
//              e.payload = JSON.parse(data);
//              e.data = e.payload;
//      PebbleEventListener.dispatchEvent(e);

// EVENT SUBSYSTEM
//  window._appMessageAckCallbacks = {};
//  window._appMessageNackCallbacks = {};
//  window.signalWebviewOpenedEvent(data)
//      type = "webviewopened"
//  window.signalReady(data)
//      type = "ready"
//  window.signalWebviewClosedEvent(data)
//      type = "webviewclosed"
//  window.signalNewAppMessageData(data)
//      type = "appmessage"
//  window.signalAppMessageAck(data)
//      type = "appmessage_ack"
//  window.signalAppMessageNack(data)
//      type = "appmessage_nack"
//  window.removeAppMessageCallbacksForTransactionId(tid)
//  window.signalSettingsWebuiLaunchOpportunity(data)
//      type = "showConfiguration"
//      type = "settings_webui_allowed" // deprecated
//  window.signalLoaded()
//  window.signalBodyLoaded()
//  window.addEventListener(type, callback, useCapture) [NATIVE]
//  window.removeEventListener(type, callback) [NATIVE]
//  window.dispatchEvent(event) [NATIVE]


// INTERNAL SIGNALING?
//  window.loadScript(url)
//  window.loadBody(url)
//  window.onload(event)

// UTILITY
//  window.isFunction(functionToCheck)
//  window.parseURL(url)
//  window.scriptHasEmbeddedAppInfo()

// HTTP QUERIES
//  window.httpGetNativeJsSynchro(theUrl)

// COMMUNICATE WITH PEBBLE
//  window.sendAppMessageRaw(rawJsonObjectToSend, callbackForAck, callbackForNack)

// SHOW NOTIFICATIONS
//  window.showAndroidToast(toast)

// JAVASCRIPT EVENT LISTENER
//  PebbleEventListener.events = []
//  PebbleEventListener.addEventListener(type, callback, useCapture)
//  PebbleEventListener.removeEventListener(type, callback)
//  PebbleEventListener._eventInitializers = {}
//  PebbleEventListener.dispatchEvent(event)

// ADDED BY JAVASCRIPT SOURCE
//  Pebble.addEventListener(type, callback, useCapture)
//      PebbleEventListener.addEventListener(type, callback, useCapture)
//  Pebble.removeEventListener(type, callback)
//      PebbleEventListener.removeEventListener(type, callback)
//  Pebble.sendAppMessage() = window.sendAppMessageRaw

// CLOSE WEBAPP?
//  Pebble.clientClose(data) [NATIVE]
//  Pebble.clientClose(optTag, data) [NATIVE]

// GET INFO
//  Pebble.getAccountToken() [NATIVE]
//  Pebble.getExtensions() [NATIVE]
//  Pebble.getVersionCode() [NATIVE]

// HTTP QUERIES
//  Pebble.executeHttp(UUID) [NATIVE]
//      Executes previously created transaction???
//  Pebble.httpGetInitiate(url, null, null) [NATIVE]
//      DISABLED
//  Pebble.httpPostInitiateBodyAsData(null, null, null, null) [NATIVE]
//      DISABLED
//  Pebble.httpPostInitiateKeyValueData(null, null, null, null) [NATIVE]
//      DISABLED

// CONTROL WEB INTERFACE
//  Pebble.loadURL(url) [NATIVE]
//  Pebble.loadUrlNoBootstrap(url) [NATIVE]
//  Pebble.openURL(url) [NATIVE]
//      = Pebble.loadURL(url)

// STORE SETTINGS
//  Pebble.nativeSettingRead(key) [NATIVE]
//  Pebble.nativeSettingReadWithOptions(key, options) [NATIVE]
//  Pebble.nativeSettingRemove(key) [NATIVE]
//  Pebble.nativeSettingRemoveWithOptions(key, options) [NATIVE]
//  Pebble.nativeSettingWrite(key, value) [NATIVE]
//  Pebble.nativeSettingWriteWithOptions(key, value, options) [NATIVE]

// REGISTER APPINFO
//  Pebble.registerJavascriptAppinfo(json) [NATIVE]

// COMMUNICATE WITH PEBBLE
//  Pebble.sendAppMessageString(jsonObjectToSend) [NATIVE]
//  Pebble.sendAppMessageString(UUID, jsonObjectToSend) [NATIVE]
//  Pebble.sendStartWatchAppMessage() [NATIVE]
//  Pebble.sendStartWatchAppMessage(UUID) [NATIVE]

// SHOW NOTIFICATIONS
//  Pebble.showNotificationOnPebble(notifyText) [NATIVE]
//      DISABLED
//  Pebble.showSimpleNotificationOnPebble(title, text) [NATIVE]
//  Pebble.showToast(toast) [NATIVE]

// INTERNAL SIGNALING?
//  Pebble.privateFnConfirmReadySignal() [NATIVE]
//  Pebble.privateFnHeartbeatPeriodic() [NATIVE]
//  Pebble.signalAppScriptLoadedByBootstrap(bool externalRegisterWebappNeeded) [NATIVE]
//  Pebble.startupScriptHasLoaded(url) [NATIVE]
//  Pebble.jsTimerTriggered(logMessage) [NATIVE]
//      Writes to log???

// LOGGING
//  console.log(message)

String.prototype.repeat = function(count)
{
    return new Array(count + 1).join(this);
}

var dumpedObjects = [[]];

Pebble.addEventListener("ready",
    function(e)
    {
        try
        {
            var output = "";
            output += "\n";
            //output += Pebble.addEventListener;
            output += dump("Pebble", Pebble);
            output += dump("isFunction", isFunction);
            output += dump("PebbleEventListener", PebbleEventListener);
            output += dump("sendAppMessageRaw", sendAppMessageRaw);
            output += dump("showAndroidToast", showAndroidToast);
            output += dump("signalWebviewOpenedEvent", signalWebviewOpenedEvent);
            output += dump("signalReady", signalReady);
            output += dump("signalWebviewClosedEvent", signalWebviewClosedEvent);
            output += dump("signalNewAppMessageData", signalNewAppMessageData);
            output += dump("signalAppMessageAck", signalAppMessageAck);
            output += dump("signalAppMessageNack", signalAppMessageNack);
            output += dump("removeAppMessageCallbacksForTransactionId", removeAppMessageCallbacksForTransactionId);
            output += dump("signalSettingsWebuiLaunchOpportunity", signalSettingsWebuiLaunchOpportunity);
            output += dump("parseURL", parseURL);
            output += dump("signalLoaded", signalLoaded);
            output += dump("signalBodyLoaded", signalBodyLoaded);
            output += dump("loadScript", loadScript);
            output += dump("loadBody", loadBody);
            output += dump("httpGetNativeJsSynchro", httpGetNativeJsSynchro);
            output += dump("scriptHasEmbeddedAppInfo", scriptHasEmbeddedAppInfo);
            output += dump("_appMessageAckCallbacks", _appMessageAckCallbacks);
            output += dump("_appMessageNackCallbacks", _appMessageNackCallbacks);
            output += dump("addEventListener", addEventListener);
            output += dump("removeEventListener", removeEventListener);
            output += dump("dispatchEvent", dispatchEvent);
            output += dump("onload", onload);
            console.log(output);
        }
        catch(e)
        {
            console.log("Error: " + e);
        }
    }
);

function dump(name, o, level)
{
    if (typeof level == "undefined")
    {
        level = 0;
    }
    indent = "    ".repeat(level);
    var output = "";
    output += indent + name + " [" + typeof o + "]:\n";
    if (typeof o == "object")
    {
        output += dumpObject(name, o, level);
    }
    else if (typeof o == "function" )
    {
        output += dumpFunction(name, o, level);
    }
    else if (typeof o == "string")
    {
        output += dumpString(name, o, level);
    }
    else if (typeof o == "boolean")
    {
        output += dumpBoolean(name, o, level);
    }
    else if (typeof o == "number")
    {
        output += dumpNumber(name, o, level);
    }
    else if (typeof o == "xml")
    {
        output += dumpXml(name, o, level);
    }
    else if (typeof o == "undefined")
    {
        output += dumpUndefined(name, o, level);
    }
    else
    {
        output += "Unrecognized type\n"
    }
    return output;
}

function dumpObject(name, o, level)
{
    var indent = "    ".repeat(level);
    var output = "";
    
    output += indent + "{\n";
    
    if (dumpedObjects.indexOf(o) != -1)
    {
        output += indent + "    OBJ#" + dumpedObjects.indexOf(o) + "\n";
        output += indent + "    PREVIOUSLY DUMPED\n";
    }
    else
    {
        dumpedObjects.push(o);
        output += indent + "    OBJ#" + dumpedObjects.indexOf(o) + "\n";
        for (var name in o)
        {
            output += dump(name, o[name], level + 1);
        }
    
    }
    output += indent + "}\n";
    return output;
}

function dumpFunction(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + o.toString().split("\n").join("\n" + indent) + "\n";
    return output;
}

function dumpString(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + '"' + o + '"\n';
    return output;
}

function dumpBoolean(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + o + '\n';
    return output;
}

function dumpNumber(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + o + '\n';
    return output;
}

function dumpXml(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + o + '\n';
    return output;
}

function dumpUndefined(name, o, level)
{
    var indent = "    ".repeat(level + 1);
    var output = "";
    output += indent + o + '\n';
    return output;
}