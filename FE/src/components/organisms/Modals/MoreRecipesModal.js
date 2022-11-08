import PropTypes from 'prop-types';
import ModalContainer from '@/components/organisms/Modals/ModalContainer';
import { ScrollArea, Stack } from '@mantine/core';
import { Preview } from '../MyPlan/components';

const Index = ({ onClose, title, onClick }) => {
  return (
    <ModalContainer title={title} onClose={onClose} onClick={onClick}>
      <ScrollArea style={{ height: 250 }}>
        <Stack>
          <Preview
            recipe={{
              author: 'nobis',
              created_at: '2022-06-07T02:50:47.000000Z',
              directions: `["An introduction to Creamy Tomato Alphabet Pasta with Carla Hall, Cookie Monster, and Chef Gonger(Click on this step or \"Make It Now\" to view introduction.)", "Place pasta, milk, and the water in a large skillet and stir together well. Add more water if the pasta is not completely covered. Bring to a boil over high heat, then reduce heat to medium-high. Cook, stirring occasionally, until the pasta is just tender and the liquid has reduced and thickened to coat the pasta. Remove from heat.", "Cut one end off an onion to create a flat base so it doesn't roll off the cutting board. Halve the onion, peel off the skin, and dice one half. Check the pasta and turn down the heat if it is bubbling. Add the diced onion, garlic clove, olive oil, canned tomatoes, milk, dried herbs, salt, and black pepper to a blender. Blend until smooth. Check pasta again and remove from heat once it is done cooking.", "Pour the tomato sauce into the pan with the pasta, then cook over medium heat until warmed through and thickened. Add additional salt and pepper to taste and serve immediately."]`,
              id: 1,
              title: 'Best Chocolate Chip Cookies with a very long text',
              image:
                'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F08%2F10813-best-chocolate-chip-cookies-mfs-step-7-148.jpg',
              url: 'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/',
              caloriesPerServing: 100,
              nutritions:
                '{"fat": 92, "carbs": 207, "sodium": 44, "calories": 1618, "cholesterol": 244}',
            }}
          />
        </Stack>
      </ScrollArea>
    </ModalContainer>
  );
};

export default Index;

Index.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
