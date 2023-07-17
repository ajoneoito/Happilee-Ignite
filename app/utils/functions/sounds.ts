/**
 * Sounds.ts
 * @module Sound Component
 * @desc Diffrent ringtone sounds for diffrent us cases.
 * @author Saifali NeoITO.
 * @version 0.0.1
 * @access public
 * ...
 */

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

/**
 * @package  react-native-sound
 * @todo install "npm i react-native-sound"
 * @see https://www.npmjs.com/package/react-native-sound
 * First you'll need to add audio files to your project.
 * Android: Save your sound clip files under the directory android/app/src/main/res/raw.
 * Note that files in this directory must be lowercase and underscored (e.g. my_file_name.mp3) and that subdirectories are not supported by Android.
 * iOS: Open Xcode and add your sound files to the project (Right-click the project and select Add Files to [PROJECTNAME])
 * @todo Restart the project after add a sound file, is required.
 * @example import Sounds from './path';
 * @example Sounds.recieve.play()
 */

// Sound for recieved message.
const recieve = new Sound('recieve.mp3', Sound.MAIN_BUNDLE, (error: any) => {
  if (error) {
    return;
  }
});

// Sound for send message.
const send = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error: any) => {
  if (error) {
    return;
  }
});

// Add more sounds here and export through 'Sounds'.

const Sounds = {send, recieve};

export default Sounds;
