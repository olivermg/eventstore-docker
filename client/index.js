const { EventStoreDBClient, jsonEvent, FORWARD, START } = require('@eventstore/db-client');

const entityId = process.env.ENTITY_ID || 'order-1';
const server = process.env.EVENTSTORE_SERVER || 'http://localhost:2113';
const client = EventStoreDBClient.connectionString(`esdb://admin:changeit@${server}?tls=false`);

async function appendEvent() {
	const event = jsonEvent({
		type: 'TestEvent',
		data: {
			entityId,
			importantData: 'foobare',
			date: `${new Date()}`
		}
	});

	return client.appendToStream('my-stream', event);
}

async function appendEvents() {
	setInterval(appendEvent, 7000);
}

async function readEvents() {
	const events = await client.readStream('my-stream', {
		direction: FORWARD,
		fromRevision: START,
		maxCount: 10
	});

	console.log(events);
}

async function subscribeToEvents() {
	return client
		.subscribeToStream('my-stream')
		.on('data', (resolvedEvent) => {
			console.log('received event', resolvedEvent);
		});
}

appendEvents()
	//.then(readEvents);
	.then(subscribeToEvents);

