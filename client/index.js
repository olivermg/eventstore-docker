const { EventStoreDBClient, jsonEvent, FORWARD, START } = require('@eventstore/db-client');

const entityId = process.env.ENTITY_ID || '1';
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

	return client.appendToStream(`orders-${entityId}`, event);
}

async function appendEvents() {
	setInterval(appendEvent, 7000);
}

async function readEvents() {
	const events = await client.readStream(`orders-${entityId}`, {
		direction: FORWARD,
		fromRevision: START,
		maxCount: 10
	});

	console.log(events);
}

async function subscribeToEvents() {
	return client
		.subscribeToStream(`orders-${entityId}`)
		.on('data', (resolvedEvent) => {
			console.log('received event', resolvedEvent);
		});
}

appendEvents()
	//.then(readEvents);
	.then(subscribeToEvents);

