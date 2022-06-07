import VenueAddress from './VenueAddress';
import champagne from '~/images/champagne.svg';

export default function ReceptionDetails() {
	return (
		<div className="border-b border-black sm:border-0">
			<div className="my-8 flex items-center justify-center">
				<img src={champagne} width={72} height={72} alt="" aria-hidden="true" />
			</div>

			<VenueAddress />

			<p className="mb-6">
				Attire: somewhere between garden and cocktail. The most important thing
				is that you are able to eat, drink, and dance!
			</p>

			<p className="mb-6">The reception is invite-only.</p>

			<p className="mb-12">
				If you have any dietary restrictions, let us know when you RSVP (Andrew
				and Milana, we already know about yours).
			</p>
		</div>
	);
}
