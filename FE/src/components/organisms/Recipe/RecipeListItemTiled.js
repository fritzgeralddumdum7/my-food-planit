import PropTypes from 'prop-types';
import { Box, Text, Grid, Loader } from '@mantine/core';
import FoodImage from '@/components/molecules/FoodImage';

const Index = ({ recipes, recipeLast, fetching }) => {
  const cards = recipes.map((recipe, index) =>
    recipes.length == index + 1 ? (
      <Grid.Col span={3} key={recipe.id} ref={recipeLast}>
        <Box
          sx={{
            borderRadius: '8px',
            minHeight: '320px',
          }}
        >
          <Box component='a' href={`/recipes/${recipe.id}`}>
            <FoodImage
              title={recipe.title}
              src={recipe.image}
              height='20vh'
              textSize={40}
            />
            <Text weight={600} pt={15}>
              {recipe.title}
            </Text>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                sx={{
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {parseInt(JSON.parse(recipe.nutritions).calories ?? 0)}
                </span>
                <span style={{ color: 'gray' }}> calories per serving</span>
                <span
                  style={{
                    color: 'gray',
                    fontSize: 20,
                    top: 10,
                    marginTop: '5px',
                  }}
                >
                  &nbsp;&bull;&nbsp;
                </span>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {recipe.serving}
                </span>
                <span style={{ color: 'gray' }}> serving</span>
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid.Col>
    ) : (
      <Grid.Col span={3} key={recipe.id}>
        <Box
          sx={{
            borderRadius: '8px',
            minHeight: '320px',
          }}
        >
          <Box component='a' href={`/recipes/${recipe.id}`}>
            <FoodImage
              title={recipe.title}
              src={recipe.image}
              height='25vh'
              textSize={60}
            />
            <Text weight={600} pt={15}>
              {recipe.title}
            </Text>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                sx={{
                  fontSize: 14,
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {parseInt(JSON.parse(recipe.nutritions).calories ?? 0)}
                </span>
                <span style={{ color: 'gray' }}> calories per serving</span>
                <span
                  style={{
                    color: 'gray',
                    fontSize: 20,
                    top: 10,
                    marginTop: '5px',
                  }}
                >
                  &nbsp;&bull;&nbsp;
                </span>
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {recipe.serving}
                </span>
                <span style={{ color: 'gray' }}> serving</span>
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid.Col>
    )
  );

  return (
    <>
      <Grid gutter='xl'>{cards}</Grid>
      <div>
        {fetching && (
          <Loader
            style={{
              margin: '10px auto',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          />
        )}
      </div>
    </>
  );
};

Index.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      image: PropTypes.string,
      calories: PropTypes.number,
      serving: PropTypes.number,
      ingredients: PropTypes.object,
      nutrition: PropTypes.object,
    })
  ),
  recipeLast: PropTypes.node,
  fetching: PropTypes.bool,
};

Index.defaultProps = {
  recipes: null,
  recipeLast: null,
  fetching: true,
};

export default Index;
