import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Input, Text, ScrollArea } from '@mantine/core';
import CloseCircle from '@/icons/CloseCircle';
import isEmpty from 'lodash/isEmpty';

const TagInput = ({ tags, setTags }) => {
  const viewport = useRef();

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

  useEffect(() => {
    if (!isEmpty(tags)) {
      viewport.current.scrollTo({ left: 9999, behavior: 'smooth' });
    }
  }, [tags]);

  const Tags = ({ label, index }) => (
    <Box
      p={8}
      mr={8}
      sx={{
        background: '#FFF',
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
      px={16}
      sx={{
        background: '#F3F6F9',
        display: 'flex',
        maxHeight: 350,
        rowGap: 10,
      }}
    >
      {!isEmpty(tags) && (
        <ScrollArea
          type='auto'
          scrollbarSize={4}
          viewportRef={viewport}
          style={{ maxWidth: `calc(100% - 116px)` }}
        >
          <Box
            py={10}
            sx={{
              display: 'flex',
            }}
          >
            {tags.map((tag, key) => (
              <Tags key={key} label={tag} index={key} />
            ))}
          </Box>
        </ScrollArea>
      )}
      <Input
        my={10}
        size='md'
        variant='unstyled'
        maxLength={40}
        placeholder='Write tag here'
        sx={{
          flex: 1,
          height: '100%',
        }}
        onKeyDown={handleSetTags}
      />
    </Box>
  );
};

export default TagInput;

TagInput.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};
