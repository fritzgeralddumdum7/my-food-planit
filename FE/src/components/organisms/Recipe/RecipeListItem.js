import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Text, Table, Space, Loader } from '@mantine/core';
import FoodImage from '@/components/molecules/FoodImage';
import Tag from '@/components/molecules/Tag';

const Index = ({ recipes, recipeLast, fetching }) => {
  const headers = ['Recipe Name', 'Calories per serving', 'Serving', 'Tags'];

  const rows = recipes.map((recipe, index) =>
    recipes.length == index + 1 ? (
      <tr key={recipe.id} ref={recipeLast}>
        <td>
          <Link href={`/recipes/${recipe.id}`} passHref>
            <Box sx={{ display: 'flex', cursor: 'pointer', padding: '14px 0' }}>
              <FoodImage
                title={recipe.title}
                src={recipe.image}
                width={52}
                height={52}
                textSize={20}
              />
              <Space px={8} />
              <Text weight='bold'>{recipe.title}</Text>
            </Box>
          </Link>
        </td>
        <td style={{ fontSize: 12, fontWeight: 'bold' }}>
          {parseInt(JSON.parse(recipe.nutritions).calories ?? 0)}
        </td>
        <td style={{ fontSize: 12, fontWeight: 'bold' }}>{recipe.serving}</td>
        <td>
          {recipe.tags?.map(({ id, label }) => (
            <Tag key={id} label={label} />
          ))}
        </td>
      </tr>
    ) : (
      <tr key={recipe.id}>
        <td>
          <Link href={`/recipes/${recipe.id}`} passHref>
            <Box sx={{ display: 'flex', cursor: 'pointer', padding: '14px 0' }}>
              <FoodImage
                title={recipe.title}
                src={recipe.image}
                width={52}
                height={52}
                textSize={20}
              />
              <Space px={8} />
              <Text weight='bold'>{recipe.title}</Text>
            </Box>
          </Link>
        </td>
        <td style={{ fontSize: 12, fontWeight: 'bold' }}>
          {parseInt(JSON.parse(recipe.nutritions).calories ?? 0)}
        </td>
        <td style={{ fontSize: 12, fontWeight: 'bold' }}>{recipe.serving}</td>
        <td>
          {recipe.tags?.map(({ id, label }) => (
            <Tag key={id} label={label} />
          ))}
        </td>
      </tr>
    )
  );

  return (
    <>
      <Table>
        <thead>
          <tr style={{ fontSize: 16 }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{ border: 0, color: '#000', fontSize: 16 }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderBottom: '1px solid #dee2e6' }}>{rows}</tbody>
      </Table>
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
};

Index.defaultProps = {
  recipes: null,
  recipeLast: null,
};

export default Index;
