import { Fragment } from 'react';

export default function VenueAddress() {
	return (
		<Fragment>
			<address className="mb-8 font-semibold not-italic">
				Seguin Valley Golf Club
				<br />
				144 Badger Road
				<br />
				Parry Sound, ON P2A 2W8
				<br />
				Canada
			</address>

			<p className="mb-8">
				Take exit 217 off of Hwy 400 towards Badger Road. Turn North onto Badger
				Road. The golf club will then appear on your left after 2 km.
			</p>
		</Fragment>
	);
}
