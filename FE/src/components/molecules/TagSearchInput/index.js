import { useState } from 'react'
import PropTypes from 'prop-types';
import { Box, Input, Text, Space } from '@mantine/core';
import CloseCircle from '@/icons/CloseCircle';
import Search from '@/icons/Search';

const Index = ({ tags, setTags }) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const handleSetTags = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value) {
      e.preventDefault();
      setTags([...tags, value]);
      e.target.value = null;
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((tag, idx) => idx !== index));
  };

  const Tags = ({ label, index }) => (
    <Box
      p={8}
      mr={8}
      sx={{
        background: '#EFF2F4',
        borderRadius: 6,
        display: 'flex',
      }}
    >
      <Text color='green-theme' weight='bold' sx={{ whiteSpace: 'pre' }}>
        {label}
      </Text>
      <div
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => handleRemoveTag(index)}
      >
        <CloseCircle
          withCircle={false}
          width={25}
          height={25}
          sx={{ cursor: 'pointer' }}
        />
      </div>
    </Box>
  );

  Tags.propTypes = {
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <Box
      sx={{
        // background: '# F3F6F9',
        padding: '4px 10px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxHeight: 350,
        overflow: 'auto',
        rowGap: 10,
        minWidth: 330,
        maxWidth: '75%',
        border: '1px solid',
        borderRadius: 32,
        borderColor: isOnFocus ? '#006C52' : '#E4EAF3'
      }}
    >
      <Search />
      <Space w={12} />
      {!!tags &&
        tags.map((tag, key) => <Tags key={key} label={tag} index={key} />)}
      <Input
        size='md'
        variant='unstyled'
        maxLength={40}
        placeholder='Search meal plan'
        sx={{ flex: 1, height: '100%' }}
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        onKeyDown={handleSetTags}
      />
    </Box>
  );
};

export default Index;

Index.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};
