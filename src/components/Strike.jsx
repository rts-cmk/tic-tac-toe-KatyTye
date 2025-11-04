function Strike({ strikeClass }) {
	const split = strikeClass?.split("-") || ["", ""]

	return (
		<div className={`strike ${strikeClass || ""} ${split[0]}-${split[1]}`}>
		</div>
	)
}

export default Strike;