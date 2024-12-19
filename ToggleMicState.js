/********************************************************
Copyright (c) 2024 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.

*********************************************************

 * Author(s):               Gerardo Chaves
 *                          Solutions Engineer
 *                          Cisco Systems
 *                          gchaves@cisco.com
 * 
 * 
 * Released: December 19, 2024
 * 
 * Version 1.0.0
 * 
 * Description: 
 *    - Implements a custom panel button to turn on/off a specific microphone
 * 
 * Tested Devices
 *     - Codec Pro
*/

import xapi from 'xapi';

// set the ID of the microphone to toggle below
const MicId = '1'

const button_color_red = '#D43B52'
const button_color_green = '#1D805F'

async function init() {
    console.log({ Message: `Intializing Macro [${_main_macro_name()}...]` })
    await buildUI()
    await StartSubscriptions()

    console.log({ Message: `Macro [${_main_macro_name()}] initialization Complete!` })
}


//Iterates over the Subscribe Object
async function StartSubscriptions() {
    const subs = Object.getOwnPropertyNames(Subscribe);
    subs.sort();
    let mySubscriptions = [];
    subs.forEach(element => {
        Subscribe[element]();
        mySubscriptions.push(element);
        Subscribe[element] = function () {
            console.warn({ Warn: `The [${element}] subscription is already active, unable to fire it again` });
        };
    });
    console.log({ Message: 'Subscriptions Set', Details: { Total_Subs: subs.length, Active_Subs: mySubscriptions.join(', ') } });
};


//Define all Event/Status subscriptions needed for the macro
const Subscribe = {
    PanelClicked: function () { xapi.Event.UserInterface.Extensions.Panel.Clicked.on(handle.Event.PanelClicked) }
}

const handle = {
    Event: {
        PanelClicked: function (event) {
            console.log(event.PanelId)
            if (event.PanelId == 'toggle_mic_state') {
                ToggleMic();
            }
        }
    }
}

function delay(ms) { return new Promise(resolve => { setTimeout(resolve, ms) }) }


async function ToggleMic() {
    console.log({ Message: `Toggle Mic ${MicId}` })
    const current_value = await xapi.Config.Audio.Input.Microphone[1].Mode.get()
    console.log({ Message: `Current Mic ${MicId} current value: ${current_value}` })


    let toggle_value = ''
    let tog_color = ''
    if (current_value == 'On') { toggle_value = 'Off' } else { toggle_value = 'On' };

    if (current_value == 'On') {
        toggle_value = 'Off';
        tog_color = button_color_red;
    }
    else {
        toggle_value = 'On';
        tog_color = button_color_green;
    };

    console.log({ Message: `Setting Mic ${MicId} to : ${toggle_value}` })
    await xapi.Config.Audio.Input.Microphone[1].Mode.set(toggle_value);
    await xapi.Command.UserInterface.Extensions.Panel.Update({ PanelId: 'toggle_mic_state', Name: `Mic${MicId} turn ${current_value}`, Color: tog_color });

}

async function buildUI() {
    console.log({ Message: `Building UserInterface...` })


    // delete any previous action buttons
    let customPanelsList = (await xapi.Command.UserInterface.Extensions.List({ ActivityType: 'Custom' }))?.Extensions.Panel;

    if (customPanelsList != undefined) {
        customPanelsList.forEach(async panel => {
            if (panel.PanelId.substring(0, 16) == "toggle_mic_state") {
                await xapi.Command.UserInterface.Extensions.Panel.Remove({ PanelId: panel.PanelId });
                console.log('removed previous panel: ', panel.PanelId)
            }
        })
    }

    // get current state of mic to toggle
    const current_value = await xapi.Config.Audio.Input.Microphone[1].Mode.get()
    console.log({ Message: `Current Mic ${MicId} current value: ${current_value}` })
    let tog_state = ''
    let tog_color = ''
    if (current_value == 'On') {
        tog_state = 'Off';
        tog_color = button_color_green;
    }
    else {
        tog_state = 'On';
        tog_color = button_color_red;
    };




    //build  action buttons
    let actionButton_xml = ``
    actionButton_xml = `<Extensions>
        <Version>1.10</Version>
        <Panel>
          <Order>1</Order>
          <PanelId>$toggle_mic_state</PanelId>
          <Origin>local</Origin>
          <Location>HomeScreenAndCallControls</Location>
          <Icon>Microphone</Icon>
          <Color>${tog_color}</Color> 
          <Name>Mic${MicId} turn ${tog_state}</Name>
          <ActivityType>Custom</ActivityType>
        </Panel>
      </Extensions>`
    await xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: 'toggle_mic_state' }, actionButton_xml)
    console.log({ Message: `UserInterface Built!` })
}

init()
