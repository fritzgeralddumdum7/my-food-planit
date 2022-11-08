import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  Button,
  Divider,
  Space,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import API from '@/api/BaseApi';
import Modal from '@/components/organisms/Modal';
import { panelList } from '@/consts/dashboard';
import SingleBoard from './SingleBoard';
import ClearOnDrop from './ClearOnDrop';

const groupLabelProps = {
  style: {
    color: '#1C212D',
    fontWeight: 500,
    fontSize: 20,
  },
}
const footerContainerProps = {
  w: 100,
  style: {
    display: 'flex',
    justifyContent: 'end'
  },
}
const saveButtonWrapper = {
  size: 'md',
  style: { padding: '12px 56px' },
}

const DashboardSettingsModal = ({
    panelSlot1,
    panelSlot2,
    panelSlot3,
    panelTypes,
    visible,
    onSubmit,
    onClose,
}) => {
    const [listItems, setListItems] = useState([]);
    const [draggingState, setIsDraggingState] = useState({ isDragging: false, item: null });

    // events
    const handleOnSetOpen = (value) => {
      if (!value && !!onClose) onClose();
    }

    const handleOnSave = useCallback(() => {
      API.request({
        method: 'POST',
        url: '/dashboard-settings',
        data: {
          panel_1_type: listItems[0]?.id ?? '',
          panel_2_type: listItems[1]?.id ?? '',
          panel_3_type: listItems[2]?.id ?? '',
        },
      }).then(() => {
        showNotification({
          color: 'green',
          message: 'Settings Saved.'
        });
        if (!!onSubmit) onSubmit();
      }).catch(err => console.error(err));
    }, [listItems]);

    const handleOnDrop = (data) => {
      const { from, to } = data;
      setListItems(values => {
        let _values = [...values];
        // status => 'active' | 'other' | 'null_active'
        const fromStatus = from.index >= 3
          ? 'other'
          : from.item
            ? 'active'
            : 'null_active'
        const toStatus = to.index >= 3
          ? 'other'
          : to.item
            ? 'active'
            : 'null_active'
        if (fromStatus === 'other' && toStatus === 'null_active') {
          _values[to.index] = from.item;
          return _values.filter((_, index) => index !== from.index);
        } else {
          _values[from.index] = to.item;
          _values[to.index] = from.item;
          return _values;
        }
      });
    }

    const handleOnDrag = (isDragging, item) => {
      setIsDraggingState({ isDragging, item });
    }

    const handleClearOnDrop = (data) => {
      const { from } = data;
      setListItems(values => {
        let res = values.map((item, index) => {
          if (from.index === index) return undefined;
          else return item;
        })
        res.push(from.item);
        return res;
      })
    }

    // side effects
    useEffect(() => {
      const slot1 = panelList.find(item => item.id === panelSlot1);
      const slot2 = panelList.find(item => item.id === panelSlot2);
      const slot3 = panelList.find(item => item.id === panelSlot3);
      const activeSlots = [slot1, slot2, slot3];
      const activeTypes = [panelSlot1, panelSlot2, panelSlot3];
      const slots = panelList.filter(item => (
        panelTypes?.includes(item.id) && !activeTypes?.includes(item.id)
      ));
      setListItems([...activeSlots, ...slots]);
    }, [panelSlot1, panelSlot2, panelSlot3, panelTypes]);

  return (
    <Modal
      opened={visible}
      setOpened={handleOnSetOpen}
      padding={0}
      header={'Custom Summary Information'}
    >
      <DndProvider backend={HTML5Backend}>
        <Divider />
        <Box p={32}>
          <Text {...groupLabelProps}>Active</Text>
          <Space h={16} />
          <SimpleGrid cols={3}>
            {listItems.slice(0, 3).map((item, index) => (
              <SingleBoard index={index} item={!!item ? {...item, isActive: true} : item } onDrop={handleOnDrop} onDrag={handleOnDrag}/>
            ))}
          </SimpleGrid>
          <Space h={42} />
          <Text {...groupLabelProps}>Other Information</Text>
          <Space h={16} />
          { draggingState?.isDragging && !!draggingState?.item?.item?.isActive && (
            <>
              <ClearOnDrop onDrop={handleClearOnDrop} />
              <Space h={16} />
            </>
          )}
          <SimpleGrid cols={3}>
            {listItems.slice(3, listItems.length).map((item, index) => (
              <SingleBoard index={index + 3} item={!!item ? {...item, isActive: false} : item } onDrop={handleOnDrop} onDrag={handleOnDrag}/>
            ))}
          </SimpleGrid>
          <Space h={40} />
          <Box {...footerContainerProps}>
            <Button {...saveButtonWrapper} onClick={handleOnSave}>
              Save
            </Button>
          </Box>
        </Box>
      </DndProvider>
    </Modal>
  );
};

export default DashboardSettingsModal;

DashboardSettingsModal.propTypes = {
  panelSlot1: PropTypes.string,
  panelSlot2:  PropTypes.string,
  panelSlot3: PropTypes.string,
  panelTypes: PropTypes.arrayOf(PropTypes.string),
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

DashboardSettingsModal.defaultProps = {
  panelTypes: [],
};
