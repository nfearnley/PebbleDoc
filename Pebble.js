function isFunction(functionToCheck)
{
    if ((functionToCheck == null) || (functionToCheck == undefined))
    {
        return false;
    }
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

var PebbleEventListener =
{
    events: [],
    addEventListener: function(type, callback, useCapture)
    {
        if( !this.events[type] )
        {
            this.events[type] = [];
            // call the event initializer, if this is the first time we
            // bind to this event.
            if( typeof(this._eventInitializers[type]) == 'function' )
            {
                this._eventInitializers[type]();
            }
        }

        if (isFunction(callback))
        {
            this.events[type].push(callback);
        }
    },
    removeEventListener: function(type, callback)
    {
        var listeners = this.events[type];
        if( !listeners ) { return; }

        for( var i = listeners.length; i--; )
        {
            if( listeners[i] === callback )
            {
                listeners.splice(i, 1);
            }
        }
    },
    _eventInitializers: {},
    dispatchEvent: function(event)
    {
        var listeners = this.events[event.type];
        if(!listeners) {return false;}
        var removeList = [];
        var returnVal = true;
        for( var i = 0; i < listeners.length; i++ )
        {
            try
            {
                var removeListener = listeners[i](event);
                if (removeListener === true)
                {
                    removeList.push(i);
                }
            }
            catch (e)
            {
                //guard against bad external code calls
                console.log('jskit_system :: PebbleEventListener : bad dispatch on event '+event.type);
                returnVal = false;
            }
        }
        for (var i = (removeList.length)-1; i >= 0; i--)
        {
            try
            {
                listeners.splice(removeList[i], 1);
                console.log('jskit_system :: PebbleEventListener : post-dispatch removed listener ' + removeList[i]
                        + ' on event '+ event.type);
            }
            catch (e)
            {
                console.log('jskit_system :: PebbleEventListener : post-dispatch failed to remove listener '
                        + removeList[i]
                        + ' on event '+ event.type);
            }
        }
        return returnVal;
    }
}

Pebble.addEventListener = function(type, callback, useCapture)
{
    PebbleEventListener.addEventListener(type, callback, useCapture);
};

Pebble.removeEventListener = function(type, callback)
{
    PebbleEventListener.removeEventListener(type, callback);
};

_appMessageAckCallbacks = {};
_appMessageNackCallbacks = {};

function sendAppMessageRaw(rawJsonObjectToSend, callbackForAck, callbackForNack)
{
    var transactionId = null;
    try
    {
        transactionId = Pebble.sendAppMessageString(JSON.stringify(rawJsonObjectToSend));
    }
    catch (e)
    {
        console.log('misuse of sendAppMessage(raw JSON object to send)...check that parameter');
    }

    if (transactionId == null)
    {
        if (callbackForNack != null)
        {
            try
            {
                callbackForNack({ "data" : { "transactionId" : null }});
            }
            catch (e)
            {
                //
            }
        }
        return;
    }


    if (callbackForAck != undefined)
    {
        var wrappedCallbackforAck = function(e)
        {
            try
            {
                if (e.data.transactionId == transactionId)
                {
 //                    console.log("calling Ack callback for transactionID: " + transactionId);
                    callbackForAck(e);
                }
                else
                {
 //                    console.log("ack fakeout");
                }
            }
            catch (exx) {}

        }
       _appMessageAckCallbacks[transactionId] = wrappedCallbackforAck;

       try
       {
           PebbleEventListener.addEventListener('appmessage_ack',wrappedCallbackforAck);
       }
       catch (e)
       {
           console.log('misuse of sendAppMessage(raw JSON object to send): ack callback param is bad');
       }
    }

    if (callbackForNack != undefined)
    {
        var wrappedCallbackforNack = function(e)
        {
            try
            {
                if (e.data.transactionId == transactionId)
                {
 //                    console.log("calling Nack callback");
                    callbackForNack(e);
                }
                else
                {
 //                    console.log("Nack fakeout");
                }
            }
            catch (exx) {}
        }
        _appMessageNackCallbacks[transactionId] = wrappedCallbackforNack;
        try
        {
            PebbleEventListener.addEventListener('appmessage_nack', wrappedCallbackforNack);
        }
        catch (e)
        {
            console.log('misuse of sendAppMessage(raw JSON object to send): nack callback param is bad');
        }
    }

    return transactionId;
}

function showAndroidToast(toast)
{
    try
    {
        Pebble.showToast(toast);
    }
    catch (e)
    {
    }
}

function signalWebviewOpenedEvent(data)
{
    var event = document.createEvent('Event');
    event.initEvent('webviewopened', true, true);
    event.type = 'webviewopened';
    event.data = data;
    event.opened = data;
    PebbleEventListener.dispatchEvent(event);
}

function signalReady(data)
{
    var event = document.createEvent('Event');
    event.initEvent('ready', true, true);
    event.type = 'ready';
    event.data = data;
    event.ready = data;
    var success = PebbleEventListener.dispatchEvent(event);
    if (success)
    {
        //callback into Pebble. (jskit) to
        // confirm this app is now armed n' ready in all respects
        // is able to execute JS code.
        // this doesn't guarantee that the 3rd party JS will continue to run
        // as it may be itself broken/have errors.
        // however, getting here means that the bootstrap and loading has succeeded

        try
        {
            Pebble.privateFnConfirmReadySignal();
            //start a heartbeat timer
            setInterval(
                function()
                {
                    try
                    {
                        Pebble.privateFnHeartbeatPeriodic();
                    }
                    catch(exc) {}
                },
                5000);
        }
        catch (ex)
        {
        }
    }
}

function signalWebviewClosedEvent(data)
{
    var event = document.createEvent('Event');
    event.initEvent('webviewclosed', true, true);
    event.type = 'webviewclosed';
    try
    {
        var decodedData = decodeURIComponent(data);
        event.data = decodedData;
        event.response = decodedData;
    }
    catch (e)
    {
        event.data = data;
        event.response = data;
    }
    PebbleEventListener.dispatchEvent(event);
}

function signalNewAppMessageData(data)
{
    var event = document.createEvent('Event');
    event.initEvent('appmessage', true, true);
    event.type = 'appmessage';
    try
    {
        event.payload = JSON.parse(data);
    }
    catch (e)
    {
        console.log('failed to JSON.parse data passed in');
        event.payload = {};
    }
    event.data = event.payload;
    PebbleEventListener.dispatchEvent(event);
}

function signalAppMessageAck(data)
{
    var event = document.createEvent('Event');
    event.initEvent('appmessage_ack', true, true);
    event.type = 'appmessage_ack';
    try
    {
        event.payload = JSON.parse(data);
    }
    catch (e)
    {
        console.log('failed to JSON.parse data passed in');
        event.payload = {};
    }

    event.data = event.payload;
    PebbleEventListener.dispatchEvent(event);

    if (event.payload.transactionId != undefined)
    {
        removeAppMessageCallbacksForTransactionId(event.payload.transactionId);
    }
}

function signalAppMessageNack(data)
{
    var event = document.createEvent('Event');
    event.initEvent('appmessage_nack', true, true);
    event.type = 'appmessage_nack';
    try
    {
        event.payload = JSON.parse(data);
    }
    catch (e)
    {
        console.log('failed to JSON.parse data passed in');
        event.payload = {};
    }

    event.data = event.payload;
    PebbleEventListener.dispatchEvent(event);

    if (event.payload.transactionId != undefined)
    {
        removeAppMessageCallbacksForTransactionId(event.payload.transactionId);
    }
}

function removeAppMessageCallbacksForTransactionId(tid)
{
    if (_appMessageAckCallbacks[tid])
    {
        PebbleEventListener.removeEventListener('appmessage_ack',_appMessageAckCallbacks[tid]);
    }

    if (_appMessageNackCallbacks[tid])
    {
        PebbleEventListener.removeEventListener('appmessage_nack',_appMessageNackCallbacks[tid]);
    }

    _appMessageAckCallbacks[tid] = undefined;
    _appMessageNackCallbacks[tid] = undefined;
}

function signalSettingsWebuiLaunchOpportunity(data)
{
    var event = document.createEvent('Event');
    event.initEvent('showConfiguration', true, true);
    event.type = 'showConfiguration';
    try
    {
        event.payload = JSON.parse(data);
    }
    catch (e)
    {
        console.log('failed to JSON.parse data passed in');
        event.payload = {};
    }
    event.data = event.payload;
    PebbleEventListener.dispatchEvent(event);

    //it was called something else before so i am maintaing that
    //don't ask me to remove it, at least for the next 3-4 weeks

    var earlyVersionCompatEvent = document.createEvent('Event');
    earlyVersionCompatEvent.initEvent('settings_webui_allowed', true, true);
    earlyVersionCompatEvent.type = 'settings_webui_allowed';
    try
    {
        earlyVersionCompatEvent.payload = JSON.parse(data);
    }
    catch (e){
        console.log('failed to JSON.parse data passed in');
        earlyVersionCompatEvent.payload = {};
    }
    earlyVersionCompatEvent.data = earlyVersionCompatEvent.payload;
    PebbleEventListener.dispatchEvent(earlyVersionCompatEvent);
}

function parseURL(url)
{
    var a = document.createElement('a');
    a.href = url;
    return
    {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params:
            (
                function()
                {
                    var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                    for (;i<len;i++)
                    {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                }
            )(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

function signalLoaded()
{
    console.log("signalLoaded");
    try
    {
        console.log("inside try-bridge-active");
    }
    catch (e)
    {
        console.log("signalLoaded : bridge not yet ready...retry-delay");
        setTimeout(function(){signalLoaded()},100);
        return;
    }

    var externalRegisterWebappNeeded = false;
    try
    {
        registerWebapp();
    }
    catch (e)
    {
        console.log('registerWebapp() failed; no such function embedded in your .js code'
            + '(system will now attempt default native-mode register');
        externalRegisterWebappNeeded = true;
    }

    Pebble.sendAppMessage = sendAppMessageRaw;    //this is SUPREMELY BAD! Yes, totally legal in JS and commonly
                                                 // done, but in case you, the reader, has not caught on by now:
                                                // THIS ISN'T PURE JS! The Android addJavascript crap has many
                                                 // potential issues, and this is pushing things.

    Pebble.signalAppScriptLoadedByBootstrap(externalRegisterWebappNeeded);
    console.log("signalLoaded (finalized)");
}

function signalBodyLoaded()
{
    console.log("signalBodyLoaded");
}

function loadScript(url)
{
    console.log("loadScript " + url);
    // adding the script tag to the head
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // then bind the event to the callback function
    // there are several events for cross browser compatibility
    script.onreadystatechange = signalLoaded;
    script.onload = signalLoaded;

    // fire the loading
    head.appendChild(script);
}

function loadBody(url)
{
    console.log("loadBody " + url);
    var body = document.getElementsByTagName('body')[0];
    var newbody = document.createElement('body');

    newbody.onreadystatechange = signalBodyLoaded;
    newbody.onload = signalBodyLoaded;
    newbody.src = url;
    //fire the loading
    console.log("document replacechild");
}

function httpGetNativeJsSynchro(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function scriptHasEmbeddedAppInfo()
{
    return (appinfo && (typeof appinfo.info != 'undefined'));
}