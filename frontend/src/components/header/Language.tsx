export default function Language() {
	return (
		<select
			required
			id="event-category"
			name="eventCategory"
			className="border-2 border-sky-300 outline-none cursor-pointer rounded-md btn py-[6px] px-3 text-sm appearance-none sm:mr-3 bg-[#030712]"
		>
			<option value="eng">ENG</option>
			<option value="pol">POL</option>
			<option value="uzb">UZB</option>
		</select>
	);
}
