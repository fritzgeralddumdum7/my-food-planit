import PropTypes from 'prop-types';
import { Text } from '@mantine/core';
import Info from '@/icons/info';

const Index = ({ children, details, opened, setOpened }) => {
  return (
    <div>
      <Text
        style={{ fontSize: 40, lineHeight: '50px', letterSpacing: '-0.05em' }}
        color={'#0F1514'}
        weight={700}
      >
        {details.question}
      </Text>
      <Text
        size={details.type && details.type === 'input' ? 'lg' : 'md'}
        color={details.type && details.type === 'choices' ? '#7A8394' : '#000'}
        weight={details.type && details.type === 'input' && 700}
        mt={8}
      >
        {details.id === 6 ? (
          <div style={{ display: 'flex', marginTop: '48px' }}>
            <Text color='#7A8394' ml={8}>
              {details.description}
              <span
                onClick={() => setOpened(true)}
                style={{
                  color: '#006C52',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                this link
              </span>
              {' '} to learn more.
            </Text>
          </div>
        ) : details.description}
      </Text>
      {children}
      {details.additionalInfo && details.id !== 6 && (
        <div style={{ display: 'flex', marginTop: '48px' }}>
          <span style={{ marginTop: '6px' }}>
            {' '}
            <Info />
          </span>
          <Text color='#7A8394' ml={8}>
            {details.additionalInfo}
          </Text>
        </div>
      )}
    </div>
  );
};

export default Index;

Index.propTypes = {
  children: PropTypes.node,
  details: PropTypes.object,
};

Index.defaultProps = {
  children: null,
  details: {
    question: '',
    description: '',
    type: '',
    additionalInfo: '',
  },
};
