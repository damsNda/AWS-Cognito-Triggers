/*
exports.handler = (event, context, callback) => {

    // Send post authentication data to Cloudwatch logs
    console.log ("Authentication successful");
    console.log ("Trigger function =", event.triggerSource);
    console.log ("User pool = ", event.userPoolId);
    console.log ("App client ID = ", event.callerContext.clientId);
    console.log ("User ID = ", event.userName);
    event.response=JSON.parse(JSON.stringify(event.request));
    event.response.userAttributes["custom:roles"]="Nasty;Child";
    event.request.userAttributes["custom:roles"]="Nasty;Child";
    console.log(JSON.stringify(event));
    callback(null, event);
};
*/


import { CognitoUserPoolTriggerHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cup = new CognitoIdentityServiceProvider();

export const handler: CognitoUserPoolTriggerHandler = async event => {
    /*console.log("Update Roles Post Authentication Start - With Data Update")
     const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
          UserPoolId: event.userPoolId,
          UserAttributes: [{
              Name: 'custom:roles',
              Value: 'Nasty;Parent;Boss',
          },
          {
            Name: 'phone_number',
            Value:'+15555555555',
         },
         {
            Name: 'phone_number_verified',
            Value: 'true',
         }
        ],
          Username: event.userName!,
      };
      await cup.adminUpdateUserAttributes(params).promise();
      console.log("Update Roles Post Authentication End - With Data Update")
     return event;*/
     console.log("Pre Authentication Filter start")
     event.response = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "custom:roles": "nasty,driver",
            },
            "claimsToSuppress": ["email"]
        }
    };
    console.log("Pre Authentication Filter end")
    return event;
};

