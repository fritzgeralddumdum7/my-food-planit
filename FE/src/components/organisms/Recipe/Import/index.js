import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { useReipeImportCTX } from '@/contexts/RecipeImportContext';
import DashboardWrapper from '@/templates/DashboardWrapper';
import Main from '@/templates/Main';
import ManageRecipe from '@/components/organisms/Recipe/Import/ManageRecipe';
import Ingredients from '@/components/organisms/Recipe/Import/Ingredients';
import LogItModal from '@/components/organisms/Recipe/Import/LogItModal';
import Breadcrumb from '@/components/organisms/Breadcrumb';
import { Box, Group, Button, Divider } from '@mantine/core';

const Index = () => {
  const { isAdmin } = useContext(AuthContext);
  const { handleSave } = useReipeImportCTX();
  const [opened, setOpened] = useState(false);

  return (
    <Main>
      <LogItModal opened={opened} setOpened={setOpened} />
      <DashboardWrapper label='Recipes'>
        <Breadcrumb
          items={[
            { title: 'My Recipes', href: '/recipes', color: '#006C52' },
            { title: 'Import Recipe', href: '#', color: '#7E8CA0' },
          ]}
        />
        <Divider my='sm' />
        <Box sx={{ width: 751 }}>
          <ManageRecipe />
          <Ingredients />
        </Box>
      </DashboardWrapper>
      <Group
        sx={{
          justifyContent: 'flex-end',
          paddingRight: 70,
          borderTop: '1px solid #E5ECF2',
          marginTop: -75,
          position: 'fixed',
          zIndex: 1,
          bottom: 0,
          right: 0,
          background: 'white',
          width: '100%',
        }}
        py={45}
      >
        <Button sx={{ width: 175 }} onClick={() => handleSave(null, null)}>
          Save
        </Button>
        {!isAdmin && (
          <Button sx={{ width: 175 }} onClick={() => setOpened(true)}>
            Save &amp; Log it
          </Button>
        )}
      </Group>
    </Main>
  );
};

export default Index;
