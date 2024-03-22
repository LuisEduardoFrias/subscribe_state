/** @format */
import "../styles/filter.css";
import categories from "../helpers/all_categories.json";

export default function Filter() {
	function handleSubmit() {}

	return (
		<div className='filter-container'>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Search products
						<input name='search' placeholder='Shirt, trousors, dress ...' />
					</label>
					<button className='btn'>Search</button>
				</div>

				<div>
					<div>
						<label>
							Select category
							<select>
								<option>{"No selected"}</option>
								{categories.map((cat: string) => (
									<option>{cat}</option>
								))}
							</select>
						</label>
					</div>

					<div>
						<label>
							Limit products
							<input
								name='limit'
								placeholder='15, 20, 34 ...'
								type='number'
								min='15'
								max='100'
							/>
						</label>
					</div>
				</div>
			</form>
		</div>
	);
}
