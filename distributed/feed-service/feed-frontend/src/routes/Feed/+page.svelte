<!--
    TODO:
    when the EventCard is clicked, an overlay should open showing EventDetails
    clicking on a Buy Tickets button in EventDetails should route the user to the buffer service
-->

<script>
	import EventCard from '../../components/Events/EventCard.svelte';

	/**
     * array of dummy event values.
     * *will be replaced by actual events in the HTTP GET request
     */
	const events = [
		{
			eventName: 'Event 1',
			eventDate: 'Date: November 15, 2023',
			eventLocation: 'Location: Venue A',
			eventDescription: 'Join us for an exciting evening filled with music and entertainment.'
		},
		{
			eventName: 'Event 2',
			eventDate: 'Date: December 5, 2023',
			eventLocation: 'Location: Venue B',
			eventDescription: 'A holiday celebration with festive decorations and delicious treats.'
		},
		{
			eventName: 'Event 3',
			eventDate: 'Date: January 20, 2024',
			eventLocation: 'Location: Venue C',
			eventDescription: 'An educational conference featuring industry experts and workshops.'
		},
		{
			eventName: 'Event 4',
			eventDate: 'Date: February 10, 2024',
			eventLocation: 'Location: Venue D',
			eventDescription: 'A fundraising gala to support a local charity and make a difference.'
		},
		{
			eventName: 'Event 5',
			eventDate: 'Date: March 25, 2024',
			eventLocation: 'Location: Venue E',
			eventDescription: 'A food festival showcasing a variety of cuisines from around the world.'
		},
		{
			eventName: 'Event 6',
			eventDate: 'Date: April 15, 2024',
			eventLocation: 'Location: Venue F',
			eventDescription: 'A cultural festival celebrating diversity.'
		},
		{
			eventName: 'Event 7',
			eventDate: 'Date: May 20, 2024',
			eventLocation: 'Location: Venue G',
			eventDescription: 'A science and technology conference with leading experts.'
		},
		{
			eventName: 'Event 8',
			eventDate: 'Date: June 5, 2024',
			eventLocation: 'Location: Venue H',
			eventDescription: 'A sports tournament with teams from around the world.'
		},
		{
			eventName: 'Event 9',
			eventDate: 'Date: July 10, 2024',
			eventLocation: 'Location: Venue I',
			eventDescription: "An art exhibition featuring renowned artists' works."
		},
		{
			eventName: 'Event 10',
			eventDate: 'Date: August 25, 2024',
			eventLocation: 'Location: Venue J',
			eventDescription: 'A charity fundraiser to support a humanitarian cause.'
		},
		{
			eventName: 'Event 11',
			eventDate: 'Date: September 10, 2024',
			eventLocation: 'Location: Venue K',
			eventDescription: 'A culinary festival showcasing local cuisine.'
		},
		{
			eventName: 'Event 12',
			eventDate: 'Date: October 5, 2024',
			eventLocation: 'Location: Venue L',
			eventDescription: 'A fashion show with the latest trends and designs.'
		},
		{
			eventName: 'Event 13',
			eventDate: 'Date: November 20, 2024',
			eventLocation: 'Location: Venue M',
			eventDescription: 'A book fair with authors and book signings.'
		},
		{
			eventName: 'Event 14',
			eventDate: 'Date: December 10, 2024',
			eventLocation: 'Location: Venue N',
			eventDescription: 'A holiday market with unique gifts and decorations.'
		},
		{
			eventName: 'Event 15',
			eventDate: 'Date: January 5, 2025',
			eventLocation: 'Location: Venue O',
			eventDescription: 'An environmental awareness campaign and cleanup event.'
		}
	];
</script>

<div class="m-10 min-h-screen rounded-lg">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</div>
