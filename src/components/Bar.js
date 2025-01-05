import PropTypes from 'prop-types';

const Bar = ({ height, color }) => (
<div
    className="array-bar"
    style={{
    height: `${height}px`,
    backgroundColor: color || '#2196F3',
    width: '15px',
    margin: '0 1px',
    display: 'inline-block',
    transition: 'all 0.1s ease-in'
    }}
/>
);

Bar.propTypes = {
height: PropTypes.number.isRequired,
color: PropTypes.string
};

export default Bar;

