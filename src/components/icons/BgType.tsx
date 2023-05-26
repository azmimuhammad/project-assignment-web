const SvgBgTypeIcon = (props: { color?: string }) => {
    const { color = "#FAFAFA" } = props;
    return (
        <svg
            viewBox="0 0 1442 1331"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1442 110C1287.36 110 1162 235.36 1162 390C1162 544.64 1287.36 670 1442 670"
                stroke={color}
                strokeWidth="220"
                strokeLinecap="round"
            />
            <path
                d="M2 1221C156.64 1221 282 1095.64 282 941C282 786.36 156.64 661 2 661"
                stroke={color}
                strokeWidth="220"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default SvgBgTypeIcon;
