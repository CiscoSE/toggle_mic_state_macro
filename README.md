# Togle Mic State Macro

Macro to implement a top level custom panel button that toggles a specific microphone on or off.

## Contacts

- Gerardo Chaves (gchaves@cisco.com)

## Solution Components

- Webex Collaboration Endpoints
- Javascript
- xAPI

## Installation/Configuration

1. Load the Javascript code included in the `ToggleMicState.js` file in this repository into a new Macro in the Macro editor of the Cisco Webex device you wish to use.

2. Set the right ID for the Microphone you wish to toggle on and off by editing the value of the MicId constant in the code (line 36). Valid values for analog microphones on a CodecPro are 1-8

3. Activate the macro

> If you are unfamiliar with Cisco Room device macros, [this](https://help.webex.com/en-us/np8b6m6/Use-of-Macros-with-Room-and-Desk-Devices-and-Webex-Boards) is a good article to get started.

> For some sample code to show you how to automate the deployment of this macro, wallpapers, touch 10 UI controls and others to multiple Webex devices, you can visit [this repository](https://github.com/voipnorm/CE-Deploy)

> For information on deploying the macros, you can read the [Awesome xAPI GitHub repository](https://github.com/CiscoDevNet/awesome-xapi#user-content-developer-tools). In addition to the deployment information, this repository also has tutorials for different macro uses, articles dedicated to different macro capabilities, libraries to help interacting with codecs, code samples illustrating the xAPI capabilities, and sandbox and testing resources for macro applications.

## Usage

Once the macro is running, a custom top-level panel will display giving you the choice to turn on or off the microphone you specified in the code. It first reads the state of the microphone to correctly set the value of the label of the button, i.e. "Mic1 turn Off" if the microphone specified has ID 1 and it was in the On state when the macro started.

Every time you press the botton, it will toggle state and update the label on the button.

### LICENSE

Provided under Cisco Sample Code License, for details see [LICENSE](LICENSE.md)

### CODE_OF_CONDUCT

Our code of conduct is available [here](CODE_OF_CONDUCT.md)

### CONTRIBUTING

See our contributing guidelines [here](CONTRIBUTING.md)

#### DISCLAIMER:

<b>Please note:</b> This script is meant for demo purposes only. All tools/ scripts in this repo are released for use "AS IS" without any warranties of any kind, including, but not limited to their installation, use, or performance. Any use of these scripts and tools is at your own risk. There is no guarantee that they have been through thorough testing in a comparable environment and we are not responsible for any damage or data loss incurred with their use.
You are responsible for reviewing and testing any scripts you run thoroughly before use in any non-testing environment.
