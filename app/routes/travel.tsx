import type { MetaFunction } from '@remix-run/server-runtime';
import React from 'react';
import VenueAddress from '~/components/VenueAddress';
import shuttleVan from '~/images/van.svg';
import InfoLayout from '~/layouts/InfoLayout';

export const meta: MetaFunction = () => ({
	title: 'Travel — Marty Penner and Meaghan Jones',
});

export default function Schedule() {
	return (
		<InfoLayout
			title="Travel"
			description="Hotel blocks and more recommendations for our out-of-towner guests."
			smallDeviceBlocks={[
				<React.Fragment key="shuttle">
					<div className="mt-8 flex items-center justify-center">
						<img
							src={shuttleVan}
							width={72}
							height={72}
							alt=""
							aria-hidden="true"
						/>
					</div>

					<h3 className="text-gray mx-auto pt-4 pb-8 text-center text-4xl uppercase">
						Shuttle from entrance lot to ceremony location
					</h3>

					<p className="mb-6 text-center font-cardo italic">
						Saturday, October 15, 2022
					</p>

					<p className="mb-12 text-center font-cardo">
						A regular shuttle will be running between the main parking lot and
						the patio where we will hold the ceremony. The walk takes generally
						less than 5 minutes if you'd rather stretch your legs.
					</p>
				</React.Fragment>,

				<React.Fragment key="ceremony">
					<h3 className="text-gray mx-auto p-8 text-center text-4xl uppercase md:text-5xl">
						Ceremony
					</h3>

					<div className="text-center font-cardo italic">
						<p className="mb-6">Saturday, October 15, 2022</p>
						<p>4:00 pm — 4:30 pm</p>

						<div className="my-8">
							<img
								src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTt9Cgkuc3Qxe2ZpbGw6IzAwMDAwMDt9Cjwvc3R5bGU+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNy41LDI1LjUgNDIsMTkgMzguOSwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM1LjMsMTQuOSAzMS45LDE0LjkgMzMuMywxNyAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMzLjgsMTggMzcuNiwxOCAzNS44LDE1LjggMzMuOCwxOCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM5LjEsMTggMzkuMSwxOCA0Mi4xLDE4IDQwLjcsMTUuNiAzOC43LDE3LjkgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0MC4xLDE0LjkgMzYuNCwxNC45IDM4LjEsMTcuMSAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDYuMyw2Ni4zYzAuOSwzLjQsMyw2LjQsNi4xLDguNmM3LjEsNSwxNywzLjMsMjItMy44czMuMy0xNy0zLjgtMjJjLTQtMi44LTguOS0zLjUtMTMuMy0yLjMgIGMwLDAuMiwwLDAuNSwwLDAuN0M1Ny4zLDU1LjYsNTIuOCw2Mi42LDQ2LjMsNjYuM3oiPjwvcGF0aD48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTEuNSw0OS44Yy0xLjEsMC45LTIuMSwxLjktMywzLjJjLTEuNSwyLjEtMi40LDQuNS0yLjcsNi45QzQ4LjgsNTcuMyw1MC45LDUzLjgsNTEuNSw0OS44eiI+PC9wYXRoPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43LDQ5LjVjMi0yLjgsNC41LTUsNy4zLTYuNWMtMi02LjUtOC0xMS4yLTE1LjEtMTEuMmMtOC43LDAtMTUuOCw3LjEtMTUuOCwxNS44czcuMSwxNS44LDE1LjgsMTUuOCAgYzEuMywwLDIuNi0wLjIsMy45LTAuNUMzOS42LDU4LjIsNDAuOSw1My41LDQzLjcsNDkuNXoiPjwvcGF0aD48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM0LDE5IDM1LjQsMjUuNSAzNi41LDI1LjUgMzcuOCwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjcyLjgsMzUuMiA3Mi43LDQzLjEgNzIuOCw0My4xIDc1LjUsMzcgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NiwzMy4yIDczLjMsMzQuMyA3NS45LDM2LjEgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3OS42LDM2IDc2LjcsMzYuNyA3Ni43LDM2LjcgNzkuOCwzOC45ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzYuMywzNy42IDczLjYsNDMuNyA3NC42LDQ0LjQgNzkuNCwzOS44ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzUuNCw0NC45IDgyLjgsNDIuMiA4MC4yLDQwLjQgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NywzMyA3Ni45LDM1LjYgNzkuOCwzNSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjgxLDM5LjcgODEsMzkuNyA4My41LDQxLjUgODMuNywzOC43IDgwLjgsMzkuNCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMxLjIsMTUuNiAyOS43LDE4IDMyLjgsMTggIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNC4zLDI1LjUgMzMsMTkgMjkuNywxOSAzNC4yLDI1LjUgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4My43LDM3LjcgODAuNiwzNS42IDgwLjgsMzguNCAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QxIiBkPSJNODQuOSwzNy40bC03LjktNS42bC01LjEsMi4xbC0wLjEsOS4yYy00LjgtMi43LTEwLjMtMy4zLTE1LjQtMi4xYy0yLjUtNy45LTkuNS0xMy44LTE4LTE0LjhsNS4yLTcuNmwtMi42LTQuNyAgaC05LjdsLTMsNC43bDUuMiw3LjZjLTEwLjgsMS4yLTE5LjIsMTAuMy0xOS4yLDIxLjRjMCwxMS45LDkuNywyMS41LDIxLjUsMjEuNWMxLjcsMCwzLjQtMC4yLDUtMC42YzEuNCw0LjMsNC4xLDguMyw4LjEsMTEuMSAgYzkuNyw2LjgsMjMuMSw0LjUsMzAtNS4yYzYuMy05LDQuOC0yMS4yLTMuMi0yOC40bDguNy0zLjJMODQuOSwzNy40eiBNODMuNywzNy43bC0yLjksMC43bC0wLjItMi44TDgzLjcsMzcuN3ogTTc3LDMzbDIuOCwyICBsLTIuOSwwLjZMNzcsMzN6IE03Ni43LDM2LjdsMi45LTAuNmwwLjIsMi44TDc2LjcsMzYuN0w3Ni43LDM2Ljd6IE03OS40LDM5LjhsLTQuOCw0LjVsLTAuOS0wLjdsMi43LTYuMUw3OS40LDM5Ljh6IE03NiwzMy4yICBsLTAuMSwyLjlsLTIuNS0xLjhMNzYsMzMuMnogTTcyLjgsMzUuMmwyLjcsMS45bC0yLjcsNi4xbC0wLjEtMC4xTDcyLjgsMzUuMnogTTM3LjUsMjUuNWwxLjMtNi41SDQyTDM3LjUsMjUuNXogTTM2LjUsMjUuNWgtMS4yICBMMzQsMTloMy44TDM2LjUsMjUuNXogTTQyLjEsMThoLTNsMC0wLjFsLTAuMy0wLjFsMi0yLjNMNDIuMSwxOHogTTQwLjEsMTQuOWwtMiwyLjJsLTEuOC0yLjJINDAuMXogTTM3LjYsMThoLTMuOGwwLDBsMi0yLjIgIEwzNy42LDE4eiBNMzUuMywxNC45bC0yLDIuMmwtMS40LTIuMkgzNS4zeiBNMzEuMiwxNS42bDEuNiwyLjRoLTMuMUwzMS4yLDE1LjZ6IE0yOS43LDE5SDMzbDEuMyw2LjVoLTAuMUwyOS43LDE5eiBNNDAuNSw2Ny41ICBDMzksNjcuOCwzNy40LDY4LDM1LjgsNjhjLTExLjMsMC0yMC41LTkuMi0yMC41LTIwLjVTMjQuNCwyNywzNS44LDI3YzkuMSwwLDE2LjksNiwxOS41LDE0LjNjLTEuMiwwLjMtMi4zLDAuOC0zLjQsMS4zICBjLTIuMS02LjgtOC41LTExLjgtMTYtMTEuOGMtOS4yLDAtMTYuOCw3LjUtMTYuOCwxNi44YzAsOS4yLDcuNSwxNi44LDE2LjgsMTYuOGMxLjQsMCwyLjctMC4yLDMuOS0wLjVjMC4zLTAuMSwwLjctMC4yLDEtMC4zICBjMS40LTAuNCwyLjYtMSwzLjgtMS43YzAuNC0wLjIsMC43LTAuNCwxLTAuN2MzLjktMi44LDYuNS03LjIsNi45LTEyLjJjMS4xLTAuOCwyLjQtMS40LDMuNi0xLjhjMCwwLjEsMCwwLjIsMCwwLjQgIGMwLDcuNi00LjEsMTQuMi0xMC4zLDE3LjdjLTAuMywwLjItMC42LDAuMy0wLjksMC41Yy0xLjIsMC42LTIuNCwxLjEtMy42LDEuNEM0MS4yLDY3LjMsNDAuOCw2Ny40LDQwLjUsNjcuNXogTTM5LjgsNjIuOCAgYy0xLjIsMC4zLTIuNSwwLjUtMy45LDAuNWMtOC43LDAtMTUuOC03LjEtMTUuOC0xNS44czcuMS0xNS44LDE1LjgtMTUuOEM0MywzMS44LDQ5LjEsMzYuNSw1MSw0M2MtMi44LDEuNS01LjMsMy43LTcuMyw2LjUgIEM0MC45LDUzLjUsMzkuNiw1OC4yLDM5LjgsNjIuOHogTTQ1LjgsNTkuOGMwLjMtMi40LDEuMi00LjgsMi43LTYuOWMwLjktMS4yLDEuOS0yLjMsMy0zLjJDNTAuOSw1My44LDQ4LjgsNTcuMyw0NS44LDU5Ljh6ICAgTTU3LjIsNDYuOGM0LjQtMS4yLDkuMy0wLjUsMTMuMywyLjNjNy4xLDUsOC44LDE0LjksMy44LDIycy0xNC45LDguOC0yMiwzLjhjLTMuMS0yLjItNS4xLTUuMi02LjEtOC42YzYuNi0zLjcsMTEtMTAuNywxMS0xOC44ICBDNTcuMyw0Ny4zLDU3LjMsNDcuMSw1Ny4yLDQ2Ljh6IE03OCw3My43Yy02LjUsOS4yLTE5LjQsMTEuNC0yOC42LDQuOWMtMy44LTIuNy02LjQtNi40LTcuNy0xMC41YzEuMi0wLjQsMi40LTAuOCwzLjYtMS40ICBjMSwzLjUsMy4yLDYuNyw2LjQsOWM3LjUsNS4zLDE4LDMuNSwyMy40LTRjNS4zLTcuNSwzLjUtMTgtNC0yMy40Yy00LjItMy05LjMtMy43LTEzLjktMi41Yy0wLjMsMC4xLTAuNywwLjItMSwwLjMgIGMtMS4yLDAuNC0yLjQsMC45LTMuNSwxLjZjLTAuNCwwLjItMC43LDAuNS0xLDAuN2MtMS41LDEuMS0yLjgsMi40LTMuOSwzLjljLTEuOCwyLjUtMi44LDUuNC0zLDguM2MtMS4yLDAuOC0yLjUsMS41LTMuOSwxLjkgIGMtMC4xLTQuMywxLjEtOC43LDMuNy0xMi41YzEuOC0yLjYsNC4yLTQuNiw2LjgtNi4xYzAuMy0wLjIsMC42LTAuMywwLjktMC41YzEuMS0wLjUsMi4yLTEsMy40LTEuM2MwLjMtMC4xLDAuNy0wLjIsMS0wLjIgIGM1LjUtMS4zLDExLjYtMC40LDE2LjYsMy4yQzgyLjQsNTEuNyw4NC42LDY0LjUsNzgsNzMuN3ogTTc1LjQsNDQuOWw0LjgtNC41bDIuNiwxLjhMNzUuNCw0NC45eiBNODMuNSw0MS41TDgxLDM5LjdsMCwwbC0wLjItMC4yICBsMi45LTAuN0w4My41LDQxLjV6Ij48L3BhdGg+PC9zdmc+"
								width={100}
								height={100}
								alt=""
								aria-hidden="true"
							/>
						</div>

						<VenueAddress />
					</div>

					<div className="text-center font-cardo">
						<p className="mb-6">
							This event is black-tie optional. The grass can be soft, so maybe
							rethink stilettos.
						</p>

						<p className="mb-12">
							There will be a few light bites along with non-alcoholic punch
							afterwards.
						</p>
					</div>

					<a
						href="https://maps.google.com/?cid=11750416750854890163"
						target="_blank"
						rel="noopener noreferrer"
						className="mb-4 flex w-full items-center justify-center border border-black bg-gray-100 px-4 py-3 text-base font-semibold uppercase hover:bg-gray-800 hover:text-white"
					>
						Map
					</a>
				</React.Fragment>,
			]}
			largeDeviceBlocks={[
				{
					left: (
						<React.Fragment>
							<div className="mb-8 flex items-center justify-center pt-8">
								<img
									src={shuttleVan}
									width={72}
									height={72}
									alt=""
									aria-hidden="true"
								/>
							</div>

							<h3 className="text-gray mx-auto px-8 pb-8 text-center text-4xl uppercase md:text-5xl">
								Shuttle from entrance lot to ceremony location
							</h3>

							<p className="mb-6 text-center font-cardo italic">
								Saturday, October 15, 2022
							</p>

							<p className="text-gray mx-auto px-8 pb-8 text-center font-cardo">
								A regular shuttle will be running between the main parking lot
								and the patio where we will hold the ceremony. The walk takes
								generally less than 5 minutes if you'd rather stretch your legs.
							</p>
						</React.Fragment>
					),
					right: (
						<React.Fragment>
							<h4 className="uppercase">
								Shuttle from entrance lot to ceremony location
							</h4>

							<p className="mb-12">
								If you have any dietary restrictions, let us know when you RSVP
								(Andrew and Milana, we already know about yours).
							</p>

							<div className="flex flex-col items-center justify-center font-montserrat not-italic">
								<a
									href="https://maps.google.com/?cid=11750416750854890163"
									target="_blank"
									rel="noopener noreferrer"
									className="mb-4 flex w-full max-w-xs items-center justify-center border border-black bg-gray-100 py-4 px-10 text-lg font-semibold uppercase hover:bg-gray-800 hover:text-white"
								>
									Map
								</a>
							</div>
						</React.Fragment>
					),
				},
				{
					left: (
						<React.Fragment>
							<h3 className="text-gray mx-auto p-8 text-center text-5xl uppercase">
								Ceremony
							</h3>

							<div className="text-center font-cardo italic">
								<p className="mb-6">Saturday, October 15, 2022</p>
								<p>4:00 pm — 4:30 pm</p>
							</div>
						</React.Fragment>
					),
					right: (
						<React.Fragment>
							<img
								src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTt9Cgkuc3Qxe2ZpbGw6IzAwMDAwMDt9Cjwvc3R5bGU+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNy41LDI1LjUgNDIsMTkgMzguOSwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM1LjMsMTQuOSAzMS45LDE0LjkgMzMuMywxNyAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMzLjgsMTggMzcuNiwxOCAzNS44LDE1LjggMzMuOCwxOCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM5LjEsMTggMzkuMSwxOCA0Mi4xLDE4IDQwLjcsMTUuNiAzOC43LDE3LjkgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0MC4xLDE0LjkgMzYuNCwxNC45IDM4LjEsMTcuMSAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDYuMyw2Ni4zYzAuOSwzLjQsMyw2LjQsNi4xLDguNmM3LjEsNSwxNywzLjMsMjItMy44czMuMy0xNy0zLjgtMjJjLTQtMi44LTguOS0zLjUtMTMuMy0yLjMgIGMwLDAuMiwwLDAuNSwwLDAuN0M1Ny4zLDU1LjYsNTIuOCw2Mi42LDQ2LjMsNjYuM3oiPjwvcGF0aD48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTEuNSw0OS44Yy0xLjEsMC45LTIuMSwxLjktMywzLjJjLTEuNSwyLjEtMi40LDQuNS0yLjcsNi45QzQ4LjgsNTcuMyw1MC45LDUzLjgsNTEuNSw0OS44eiI+PC9wYXRoPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43LDQ5LjVjMi0yLjgsNC41LTUsNy4zLTYuNWMtMi02LjUtOC0xMS4yLTE1LjEtMTEuMmMtOC43LDAtMTUuOCw3LjEtMTUuOCwxNS44czcuMSwxNS44LDE1LjgsMTUuOCAgYzEuMywwLDIuNi0wLjIsMy45LTAuNUMzOS42LDU4LjIsNDAuOSw1My41LDQzLjcsNDkuNXoiPjwvcGF0aD48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM0LDE5IDM1LjQsMjUuNSAzNi41LDI1LjUgMzcuOCwxOSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjcyLjgsMzUuMiA3Mi43LDQzLjEgNzIuOCw0My4xIDc1LjUsMzcgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NiwzMy4yIDczLjMsMzQuMyA3NS45LDM2LjEgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3OS42LDM2IDc2LjcsMzYuNyA3Ni43LDM2LjcgNzkuOCwzOC45ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzYuMywzNy42IDczLjYsNDMuNyA3NC42LDQ0LjQgNzkuNCwzOS44ICI+PC9wb2x5Z29uPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNzUuNCw0NC45IDgyLjgsNDIuMiA4MC4yLDQwLjQgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3NywzMyA3Ni45LDM1LjYgNzkuOCwzNSAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjgxLDM5LjcgODEsMzkuNyA4My41LDQxLjUgODMuNywzOC43IDgwLjgsMzkuNCAiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMxLjIsMTUuNiAyOS43LDE4IDMyLjgsMTggIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNC4zLDI1LjUgMzMsMTkgMjkuNywxOSAzNC4yLDI1LjUgIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4My43LDM3LjcgODAuNiwzNS42IDgwLjgsMzguNCAiPjwvcG9seWdvbj48cGF0aCBjbGFzcz0ic3QxIiBkPSJNODQuOSwzNy40bC03LjktNS42bC01LjEsMi4xbC0wLjEsOS4yYy00LjgtMi43LTEwLjMtMy4zLTE1LjQtMi4xYy0yLjUtNy45LTkuNS0xMy44LTE4LTE0LjhsNS4yLTcuNmwtMi42LTQuNyAgaC05LjdsLTMsNC43bDUuMiw3LjZjLTEwLjgsMS4yLTE5LjIsMTAuMy0xOS4yLDIxLjRjMCwxMS45LDkuNywyMS41LDIxLjUsMjEuNWMxLjcsMCwzLjQtMC4yLDUtMC42YzEuNCw0LjMsNC4xLDguMyw4LjEsMTEuMSAgYzkuNyw2LjgsMjMuMSw0LjUsMzAtNS4yYzYuMy05LDQuOC0yMS4yLTMuMi0yOC40bDguNy0zLjJMODQuOSwzNy40eiBNODMuNywzNy43bC0yLjksMC43bC0wLjItMi44TDgzLjcsMzcuN3ogTTc3LDMzbDIuOCwyICBsLTIuOSwwLjZMNzcsMzN6IE03Ni43LDM2LjdsMi45LTAuNmwwLjIsMi44TDc2LjcsMzYuN0w3Ni43LDM2Ljd6IE03OS40LDM5LjhsLTQuOCw0LjVsLTAuOS0wLjdsMi43LTYuMUw3OS40LDM5Ljh6IE03NiwzMy4yICBsLTAuMSwyLjlsLTIuNS0xLjhMNzYsMzMuMnogTTcyLjgsMzUuMmwyLjcsMS45bC0yLjcsNi4xbC0wLjEtMC4xTDcyLjgsMzUuMnogTTM3LjUsMjUuNWwxLjMtNi41SDQyTDM3LjUsMjUuNXogTTM2LjUsMjUuNWgtMS4yICBMMzQsMTloMy44TDM2LjUsMjUuNXogTTQyLjEsMThoLTNsMC0wLjFsLTAuMy0wLjFsMi0yLjNMNDIuMSwxOHogTTQwLjEsMTQuOWwtMiwyLjJsLTEuOC0yLjJINDAuMXogTTM3LjYsMThoLTMuOGwwLDBsMi0yLjIgIEwzNy42LDE4eiBNMzUuMywxNC45bC0yLDIuMmwtMS40LTIuMkgzNS4zeiBNMzEuMiwxNS42bDEuNiwyLjRoLTMuMUwzMS4yLDE1LjZ6IE0yOS43LDE5SDMzbDEuMyw2LjVoLTAuMUwyOS43LDE5eiBNNDAuNSw2Ny41ICBDMzksNjcuOCwzNy40LDY4LDM1LjgsNjhjLTExLjMsMC0yMC41LTkuMi0yMC41LTIwLjVTMjQuNCwyNywzNS44LDI3YzkuMSwwLDE2LjksNiwxOS41LDE0LjNjLTEuMiwwLjMtMi4zLDAuOC0zLjQsMS4zICBjLTIuMS02LjgtOC41LTExLjgtMTYtMTEuOGMtOS4yLDAtMTYuOCw3LjUtMTYuOCwxNi44YzAsOS4yLDcuNSwxNi44LDE2LjgsMTYuOGMxLjQsMCwyLjctMC4yLDMuOS0wLjVjMC4zLTAuMSwwLjctMC4yLDEtMC4zICBjMS40LTAuNCwyLjYtMSwzLjgtMS43YzAuNC0wLjIsMC43LTAuNCwxLTAuN2MzLjktMi44LDYuNS03LjIsNi45LTEyLjJjMS4xLTAuOCwyLjQtMS40LDMuNi0xLjhjMCwwLjEsMCwwLjIsMCwwLjQgIGMwLDcuNi00LjEsMTQuMi0xMC4zLDE3LjdjLTAuMywwLjItMC42LDAuMy0wLjksMC41Yy0xLjIsMC42LTIuNCwxLjEtMy42LDEuNEM0MS4yLDY3LjMsNDAuOCw2Ny40LDQwLjUsNjcuNXogTTM5LjgsNjIuOCAgYy0xLjIsMC4zLTIuNSwwLjUtMy45LDAuNWMtOC43LDAtMTUuOC03LjEtMTUuOC0xNS44czcuMS0xNS44LDE1LjgtMTUuOEM0MywzMS44LDQ5LjEsMzYuNSw1MSw0M2MtMi44LDEuNS01LjMsMy43LTcuMyw2LjUgIEM0MC45LDUzLjUsMzkuNiw1OC4yLDM5LjgsNjIuOHogTTQ1LjgsNTkuOGMwLjMtMi40LDEuMi00LjgsMi43LTYuOWMwLjktMS4yLDEuOS0yLjMsMy0zLjJDNTAuOSw1My44LDQ4LjgsNTcuMyw0NS44LDU5Ljh6ICAgTTU3LjIsNDYuOGM0LjQtMS4yLDkuMy0wLjUsMTMuMywyLjNjNy4xLDUsOC44LDE0LjksMy44LDIycy0xNC45LDguOC0yMiwzLjhjLTMuMS0yLjItNS4xLTUuMi02LjEtOC42YzYuNi0zLjcsMTEtMTAuNywxMS0xOC44ICBDNTcuMyw0Ny4zLDU3LjMsNDcuMSw1Ny4yLDQ2Ljh6IE03OCw3My43Yy02LjUsOS4yLTE5LjQsMTEuNC0yOC42LDQuOWMtMy44LTIuNy02LjQtNi40LTcuNy0xMC41YzEuMi0wLjQsMi40LTAuOCwzLjYtMS40ICBjMSwzLjUsMy4yLDYuNyw2LjQsOWM3LjUsNS4zLDE4LDMuNSwyMy40LTRjNS4zLTcuNSwzLjUtMTgtNC0yMy40Yy00LjItMy05LjMtMy43LTEzLjktMi41Yy0wLjMsMC4xLTAuNywwLjItMSwwLjMgIGMtMS4yLDAuNC0yLjQsMC45LTMuNSwxLjZjLTAuNCwwLjItMC43LDAuNS0xLDAuN2MtMS41LDEuMS0yLjgsMi40LTMuOSwzLjljLTEuOCwyLjUtMi44LDUuNC0zLDguM2MtMS4yLDAuOC0yLjUsMS41LTMuOSwxLjkgIGMtMC4xLTQuMywxLjEtOC43LDMuNy0xMi41YzEuOC0yLjYsNC4yLTQuNiw2LjgtNi4xYzAuMy0wLjIsMC42LTAuMywwLjktMC41YzEuMS0wLjUsMi4yLTEsMy40LTEuM2MwLjMtMC4xLDAuNy0wLjIsMS0wLjIgIGM1LjUtMS4zLDExLjYtMC40LDE2LjYsMy4yQzgyLjQsNTEuNyw4NC42LDY0LjUsNzgsNzMuN3ogTTc1LjQsNDQuOWw0LjgtNC41bDIuNiwxLjhMNzUuNCw0NC45eiBNODMuNSw0MS41TDgxLDM5LjdsMCwwbC0wLjItMC4yICBsMi45LTAuN0w4My41LDQxLjV6Ij48L3BhdGg+PC9zdmc+"
								width={100}
								height={100}
								alt=""
								aria-hidden="true"
							/>

							<VenueAddress />

							<div>
								<p className="mb-6">
									This event is black-tie optional. The grass can be soft, so
									maybe rethink stilettos.
								</p>

								<p className="mb-12">
									There will be a few light bites along with non-alcoholic punch
									afterwards.
								</p>

								<div className="flex flex-col items-center justify-center font-montserrat not-italic">
									<a
										href="https://maps.google.com/?cid=11750416750854890163"
										target="_blank"
										rel="noopener noreferrer"
										className="mb-4 flex w-full max-w-xs items-center justify-center border border-black bg-gray-100 py-4 px-10 text-lg font-semibold uppercase not-italic hover:bg-gray-800 hover:text-white"
									>
										Map
									</a>
								</div>
							</div>
						</React.Fragment>
					),
				},
			]}
		/>
	);
}
