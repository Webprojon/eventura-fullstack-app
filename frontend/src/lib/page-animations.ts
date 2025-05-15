export const fromLeftToRight = {
	initial: {
		opacity: 0,
		x: "-100%",
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export const fromTopToBottom = {
	initial: {
		opacity: 0,
		y: -400,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 50,
		},
	},
};

export const smoothOpacity = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export const modalAnim = {
	initial: { opacity: 0, y: -5 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
		},
	},
};
