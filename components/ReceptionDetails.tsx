import Image from 'next/image';
import VenueAddress from './VenueAddress';
import champagne from '../public/assets/champagne.svg';

function ReceptionDetails(props) {
	return (
		<div className="border-b sm:border-0 border-black">
			<div className="flex items-center justify-center my-8">
				<Image
					src={champagne}
					width={72}
					height={72}
					alt=""
					aria-hidden="true"
				/>
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

export default ReceptionDetails;
