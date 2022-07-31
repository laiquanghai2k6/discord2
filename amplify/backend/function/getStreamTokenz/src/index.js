
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STREAM_KEYZ
	STREAM_SECRETZ
Amplify Params - DO NOT EDIT */

const StreamChat = require("stream-chat").StreamChat;

const { STREAM_KEYZ, STREAM_SECRETZ } = process.env;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
	if(!event?.identity?.sub){
		return "";
	}
	const client = StreamChat.getInstance(STREAM_KEYZ,STREAM_SECRETZ);

	const token = client.createToken(event.identity.sub);


    return token;
};
