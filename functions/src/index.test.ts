import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as sinon from 'sinon';

const mock = require('firebase-functions-test')();
const adminInitStub = sinon.stub(admin, 'initializeApp');
import * as myFunctions from './index';

test('thing', () => {
  expect(true).toBeTruthy();
});

// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
// import * as sinon from 'sinon';
//
// // process.env.GCLOUD_PROJECT = 'not-a-project';
// // const adminInitStub = sinon.stub(admin, 'initializeApp');
// // const configStub = sinon.stub(functions, 'config').returns({
// //   firebase: {
// //     credential: admin.credential.applicationDefault(),
// //     databaseURL: 'https://not-a-project.firebaseio.com',
// //     storageBucket: 'not-a-project.appspot.com',
// //   }
// // });
// //
// // const Firestore = require('@google-cloud/firestore');
// // const firestore = new Firestore();
// // const reference = require('@google-cloud/firestore/src/reference')(Firestore);
// // const DocumentReference = reference.DocumentReference;
// // const DocumentSnapshot = require('@google-cloud/firestore/src/document')(DocumentReference).DocumentSnapshot
// //
// // import * as myFunctions from './index';
//
// // =====================
// let configStub: sinon.SinonStub, adminInitStub: sinon.SinonStub;
//
// // beforeEach(() => {
//   // Since index.js makes calls to functions.config and admin.initializeApp at the top of the file,
//   // we need to stub both of these functions before requiring index.js. This is because the
//   // functions will be executed as a part of the require process.
//   // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
//   // admin =  require('firebase-admin');
//   adminInitStub = sinon.stub(admin, 'initializeApp');
//   // Next we stub functions.config(). Normally config values are loaded from Cloud Runtime Config;
//   // here we'll just provide some fake values for firebase.databaseURL and firebase.storageBucket
//   // so that an error is not thrown during admin.initializeApp's parameter check
//   configStub = sinon.stub(functions, 'config').returns({
//       firebase: {
//         databaseURL: 'https://not-a-project.firebaseio.com',
//         storageBucket: 'not-a-project.appspot.com',
//       }
//       // You can stub any other config values needed by your functions here, for example:
//       // foo: 'bar'
//     });
//   // Now we can require index.js and save the exports inside a namespace called myFunctions.
//   // This includes our cloud functions, which can now be accessed at myFunctions.makeUppercase
//   // and myFunctions.addMessage
//   // myFunctions = require('./index');
// import * as myFunctions from './index';
// // });
//
// // afterEach(() => {
// //   // Restoring our stubs to the original methods.
// //   configStub.restore();
// //   adminInitStub.restore();
// // });
// // ============================
//
// describe('log', () => {
//   test('calls handleMessage', () => {
//     expect.assertions(1);
//     const req = {
//       body: {
//         token: 'faketoken',
//         team_id: 'fake_team',
//         team_domain: 'example',
//         channel_id: 'fake_channel',
//         channel_name: 'general',
//         user_id: 'fake_user_id',
//         user_name: 'bobcat',
//         command: '/eod',
//         text: 'I made this awesome app',
//         response_url: 'https://hooks.slack.com/commands/some/stuff',
//         trigger_id: 'fake_trigger_id'
//       }
//     };
//
//     const res = {
//       send: (text: string) => {
//         expect(text).toEqual(`Logging your EOD as "${req.body.text}"`);
//       }
//     };
//     // myFunctions.log(req, res);
//   });
//
//   // test('returns text', () => {
//   //
//   // });
// });

// const chai = require('chai');
// const assert = chai.assert;
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
// const sinon = require('sinon');
//
// describe('Cloud Functions', () => {
//   var myFunctions, configStub, adminInitStub, functions, admin, Firestore, firestore;
//   const reference = require('@google-cloud/firestore/src/reference')(Firestore);
//   const DocumentReference = reference.DocumentReference;
//   const DocumentSnapshot = require('@google-cloud/firestore/src/document')(DocumentReference).DocumentSnapshot
//
//   before(() => {
//     admin = require('firebase-admin');
//     adminInitStub = sinon.stub(admin, 'initializeApp');
//     functions = require('firebase-functions');
//
//     process.env.GCLOUD_PROJECT = 'not-a-project';
//     configStub = sinon.stub(functions, 'config').returns({
//       firebase: {
//         databaseURL: 'https://not-a-project.firebaseio.com',
//         storageBucket: 'not-a-project.appspot.com'
//       }
//     });
//     Firestore = require('@google-cloud/firestore');
//     firestore = new Firestore();
//
//     myFunctions = require('../index');
//   });
//
//   after(() => {
//     configStub.restore();
//     adminInitStub.restore();
//   });
//
//   describe('log', () => {
//     it('should do something', (done) => {
//       const req = {
//         body: {
//           token: 'faketoken',
//           team_id: 'fake_team',
//           team_domain: 'example',
//           channel_id: 'fake_channel',
//           channel_name: 'general',
//           user_id: 'fake_user_id',
//           user_name: 'bobcat',
//           command: '/eod',
//           text: 'I made this awesome app',
//           response_url: 'https://hooks.slack.com/commands/some/stuff',
//           trigger_id: 'fake_trigger_id'
//         }
//       };
//
//       const res = {
//         send: (text) => {
//           assert.equal(text, `Logging your EOD as "${req.body.text}"`);
//           done();
//         }
//       };
//
//       myFunctions.log(req, res);
//     });
//   });
//
//   describe('eodMessage', () => {
//     it('should format EOD text', (done) => {
//       const messages = [
//         {
//           name: 'cat',
//           text: 'something something'
//         },
//         {
//           name: 'dog',
//           text: 'other stuff'
//         }
//       ];
//       const date = new Date(2017, 7, 20);
//       assert.equal(myFunctions.eodMessage(date, messages), `
// 🌇 EODs for Aug, 20th:
// - cat: something something.
// - dog: other stuff.`);
//       done();
//     });
//   });
// });
