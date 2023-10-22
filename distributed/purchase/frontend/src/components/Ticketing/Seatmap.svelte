<!DOCTYPE html>
<html lang="en">
	<head>
		<title>TicketSlave</title>

		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.css"
		/>

		<style>
			.standing {
				color: white;
				background-color: #43aa8b;
			}

            .cat-1 {
                color: white;
                background-color: #277da1;
            }

            .cat-2 {
                color: white;
                background-color: #f8961e;
            }
		</style>
	</head>

	<body>
		<div id="container" />

		<script
			type="text/javascript"
			src="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.js"
		></script>
		<script>
			var element = document.getElementById('container');
			var options = {
				map: {
					rows: 7,
					columns: 7,
					seatTypes: {
						default: {
							label: 'Standing Pen',
							cssClass: 'standing',
							price: 10
						}
					}
				}
			};

			var sc = new Seatchart(element, options);
		</script>
	</body>
</html>
