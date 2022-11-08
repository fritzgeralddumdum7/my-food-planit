import {
  Box,
  Center,
  Text,
  Space,
  Button,
  Divider,
  Table,
  Pagination,
  Loader,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import ChevronLeftV1 from '../../../icons/ChevronLeftV1';
import ChevronRightV1 from '../../../icons/ChevronRightV1';
import InvitationModal from './modal/InvitationModal';
import API from '@/api/BaseApi';
import usePaginateApi from '../../../hooks/usePaginateApi';
import moment from 'moment';
import { showNotification } from '@mantine/notifications';

const tableHead = ['', 'Email', 'Status', 'Date Invited', 'Date Joined', ''];

const Index = () => {
  const FRIENDS_PER_PAGE = 5;
  const [opened, setOpened] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [joinedCount, setJoinedCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const colors = ['#C8362E', '#D48C29', '#D7998E', '#47A2D6'];
  const [submitted, setSubmitted] = useState(false);

  const [friends, activePage, setPage, fetching] = usePaginateApi(
    {
      method: 'GET',
      url: '/friend',
    },
    [submitted]
  );

  const handleClick = (email) => {
    setSubmitting(true);
    API.request({ method: 'POST', url: '/friend/resend', data: {'email': email} }).then(({ data }) => {
      showNotification({
        color: 'green',
        message: 'Email sent.',
      });
      setSubmitting(false);
    });
  }


  useEffect(() => {
    API.request({ method: 'POST', url: '/friend/count' }).then(({ data }) => {
      setJoinedCount(data);
    });
  }, []);
  
  useEffect(() => {
    if (fetching) return;
    setPageCount(
      friends.total / FRIENDS_PER_PAGE > 1
        ? Math.ceil(friends.total / FRIENDS_PER_PAGE)
        : 1
    );
  }, [fetching]);

  const InitialIcon = ({ email }) => {
    return <>
      <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 32, color: '#FFF', backgroundColor: colors[Math.floor(Math.random() * 4)] }}>
        <Text sx={{ fontweight: 700, marginTop: 2 }}>{email.charAt(0).toUpperCase()}</Text>
      </Box>
    </>;
  }

  const Friends = () => {
    return (
      <>
        {fetching && (
          <td colSpan={6}>
            <Center>
              <Loader />
            </Center>
          </td>
        )}
        {!fetching &&
          friends.data.map(({ email, hasJoined, invited, joined }) => (
            <tr style={{ height: '48px' }}>
              <td style={{ padding: '8px 20px', width: 32 }}><InitialIcon email={email}/></td>
              <td>{email}</td>
              <td>
                <Box
                  sx={{
                    backgroundColor: hasJoined ? '#B2DD91' : '#006C52',
                    width: 51,
                    height: 24,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    sx={{
                      paddingTop: '2px',
                      lineHeight: '24px',
                      fontSize: 12,
                      fontWeight: 400,
                      color: !hasJoined ? '#fff' : '#000',
                    }}
                  >
                    {hasJoined ? 'Joined' : 'Invited'}
                  </Text>
                </Box>
              </td>
              <td>{moment(invited).format('DD MMM YYYY')}</td>
              <td>
                {joined ? moment(joined).format('DD MMM YYYY') : 'Pending'}
              </td>
              <td style={{ padding: 0, width: 240 }}>
                {!hasJoined && 
                  <Button disabled={submitting} onClick={() => handleClick(email)} height={31}>Resend</Button>
                }
              </td>
            </tr>
          ))}
      </>
    );
  };

  const EmptyFriendsPage = () => {
    return (
      <Center>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 150,
          }}
        >
          <Friends width={100} height={100} />
          <Text sx={{ fontSize: 24, fontWeight: 700 }}>
            You currently do not have any friends added
          </Text>
          <Text sx={{ color: '#959595' }}>
            Invite your friends from Facebook or by email so you can give each
            other support and motivation.
          </Text>
          <Space h={48} />
          <Button size='lg' onClick={setOpened}>
            Invite Friends
          </Button>
        </Box>
      </Center>
    );
  };

  const nextPage = () => {
    setPage(activePage + 1);
  };

  const prevPage = () => {
    setPage(activePage - 1);
  };

  return (
    <>
      <>
        {friends?.length <= 0 ? (
          <EmptyFriendsPage />
        ) : (
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '32px 28px',
                width: '100%',
                height: '116px',
                backgroundColor: '#F7F8FB',
                borderRadius: 15,
              }}
            >
              <Space w={22} />
              <Text sx={{ fontSize: 24, fontWeight: 700, maxWidth: 159 }}>
                Your referral summary
              </Text>
              <Space w={100} />
              <Box>
                <Text sx={{ fontSize: 24, fontWeight: 700 }}>
                  {friends ? friends?.total : 0}
                </Text>
                <Space w={6} />
                <Text sx={{ color: '#707070' }}>Friends Invited</Text>
              </Box>
              <Space w={57} />
              <Divider sx={{ height: 48 }} orientation='vertical' />
              <Space w={57} />
              <Box>
                <Text sx={{ fontSize: 24, fontWeight: 700 }}>
                  {joinedCount}
                </Text>
                <Space w={6} />
                <Text sx={{ color: '#707070' }}>Friends Joined</Text>
              </Box>
              <Space w={57} />
              <Button
                sx={{ padding: '12px 47px', marginLeft: 'auto' }}
                size='md'
                onClick={() => setOpened(true)}
              >
                <Text>Invite Friends</Text>
              </Button>
            </Box>
            <Space h={61} />
            <Box sx={{ height: 400 }}>
              <Table
                sx={{ padding: 58, borderBottom: 'none' }}
                verticalSpacing='lg'
                striped
              >
                <thead>
                  <tr>
                    {tableHead.map((item) => (
                      <th style={{ border: 0 }}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Friends />
                </tbody>
              </Table>
            </Box>
            <Space h={48} />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              {activePage > 1 && (
                <Button
                  sx={{
                    backgroundColor: '#fff',
                    height: 22,
                    width: 22,
                    padding: 0,
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                  }}
                  onClick={prevPage}
                >
                  <ChevronLeftV1
                    color='#006C52'
                    minX={-5}
                    minY={-4}
                    width={14}
                    height={14}
                  />
                </Button>
              )}
              <Pagination
                styles={{
                  item: { height: 22, width: 22, minWidth: 0, fontSize: 14 },
                  active: { height: 22, width: 22 },
                  dots: { height: 22, width: 32 },
                }}
                page={activePage}
                onChange={setPage}
                siblings={1}
                boundaries={1}
                total={pageCount}
                withControls={false}
              />
              {activePage < pageCount && (
                <Button
                  sx={{
                    backgroundColor: '#fff',
                    height: 22,
                    width: 22,
                    padding: 0,
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                  }}
                  onClick={nextPage}
                >
                  <ChevronRightV1
                    color='#006C52'
                    minX={-5}
                    minY={-4}
                    width={14}
                    height={14}
                  />
                </Button>
              )}
            </Box>
          </Box>
        )}
      </>

      <InvitationModal opened={opened} setOpened={setOpened} setSubmitted={setSubmitted} submitted={submitted} />
    </>
  );
};

export default Index;
