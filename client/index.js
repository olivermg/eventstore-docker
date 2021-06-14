const { EventStoreDBClient, jsonEvent, FORWARD, START } = require('@eventstore/db-client');

const client = EventStoreDBClient.connectionString('esdb://admin:changeit@127.0.0.1:2113?tls=false');

async function appendEvent() {
	const event = jsonEvent({
		type: 'TestEvent',
		data: {
			entityId: `${Math.random()}`,
			importantData: 'foobar'
		}
	});

	await client.appendToStream('my-stream', event);
}

async function readEvents() {
	const events = await client.readStream('my-stream', {
		direction: FORWARD,
		fromRevision: START,
		maxCount: 10
	});

	console.log(events);
}

appendEvent().then(readEvents);

