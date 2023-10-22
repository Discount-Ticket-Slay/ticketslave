<!DOCTYPE html>
<html lang="en">
	<head>
		<title>TicketSlave</title>
		<meta charset="utf-8" />

		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.css" />
		<style>
            .sc-container {
                display: flex;
                justify-content: center;
            }
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
        <div class="sc-container">
            <div id="container" />
        </div>

		<script
			type="text/javascript"
			src="https://cdn.jsdelivr.net/npm/seatchart@0.1.0/dist/seatchart.min.js"
		></script>

		<script>
			var options = {
				map: {
					rows: 10,
					columns: 10,
					seatTypes: {
						default: {
							label: 'Standing Pen',
							cssClass: 'standing',
							price: 70
						},
						first: {
							label: 'Cat 1',
							cssClass: 'cat-1',
							price: 75,
							seatRows: [0, 1, 2]
						},
						reduced: {
							label: 'Cat 2',
							cssClass: 'cat-2',
							price: 80,
							seatRows: [7, 8, 9]
						}
					},
					disabledSeats: [
						{ row: 0, col: 0 },
						{ row: 0, col: 9 }
					],
					reservedSeats: [
						{ row: 0, col: 3 },
						{ row: 0, col: 4 }
					],
					selectedSeats: [
						{ row: 0, col: 5 },
						{ row: 0, col: 6 }
					],
					rowSpacers: [3, 7],
					columnSpacers: [5]
				}
			};

			var element = document.getElementById('container');
			var sc = new Seatchart(element, options);
			sc.addEventListener('submit', function handleSubmit(e) {
				alert('Total: ' + e.total + '$');
			});
		</script>
	</body>
</html>
