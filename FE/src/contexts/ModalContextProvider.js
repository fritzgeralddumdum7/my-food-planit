import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';
import ApplyMealPlanModal from '@/components/organisms/Modals/ApplyMealPlanModal';
import ApplyMealPlanConflictModal from '@/components/organisms/Modals/ApplyMealPlanConflictModal';
import IngredientModal from '@/components/organisms/Modals/IngredientModal';
import StorePlanPaypalModal from '@/components/organisms/Modals/StorePlanPaypalModal';
import ShopIngredientsModal from '@/components/organisms/Modals/ShopIngredientsModal';
import ConfirmModal from '@/components/organisms/Modals/ConfirmModal';
import SelectMealTypeModal from '@/components/organisms/Modals/SelectMealTypeModal';
import { useRouter } from 'next/router';

const initialState = {
  spinner: {
    visible: false,
  },
  applyMealPlanModal: {
    visible: false,
  },
  applyMealPlanConflictModal: {
    visible: false,
  },
  ingredientModal: {
    visible: false,
  },
  storePlanPaypalModal: {
    visible: false,
  },
  shopIngredientsModal: {
    visible: false,
  },
  confirmModal: {
    visible: false,
  },
  selectMealTypeModal: {
    visible: false,
  },
};

const ModalStateContext = createContext(initialState);
const ModalDispatchContext = createContext(undefined);

export function useModalState() {
  return useContext(ModalStateContext);
}

export function useModalDispatch() {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
}

const immerReducer = (draft, action) => {
  switch (action.type) {
    case 'showSpinner': {
      draft.spinner = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideSpinner': {
      draft.spinner = initialState.spinner;
      break;
    }
    case 'showApplyMealPlanModal': {
      draft.applyMealPlanModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideApplyMealPlanModal': {
      draft.applyMealPlanModal = initialState.applyMealPlanModal;
      break;
    }
    case 'showApplyMealPlanConflictModal': {
      draft.applyMealPlanConflictModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideApplyMealPlanConflictModal': {
      draft.applyMealPlanConflictModal =
        initialState.applyMealPlanConflictModal;
      break;
    }
    case 'showIngredientModal': {
      draft.ingredientModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideIngredientModal': {
      draft.ingredientModal = initialState.ingredientModal;
      break;
    }
    case 'showStorePlanPaypal': {
      draft.storePlanPaypalModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideStorePlanPaypal': {
      draft.storePlanPaypalModal = initialState.storePlanPaypalModal;
      break;
    }
    case 'showShopIngredientsModal': {
      draft.shopIngredientsModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideShopIngredientsModal': {
      draft.shopIngredientsModal = initialState.shopIngredientsModal;
      break;
    }
    case 'showConfirmModal': {
      draft.confirmModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideConfirmModal': {
      draft.confirmModal = initialState.confirmModal;
      break;
    }
    case 'showSelectMealTypeModal': {
      draft.selectMealTypeModal = {
        ...action.payload,
        visible: true,
      };
      break;
    }
    case 'hideSelectMealTypeModal': {
      draft.selectMealTypeModal = initialState.selectMealTypeModal;
      break;
    }
    default:
      console.log('ui reducer: unexpected action type');
      break;
  }
};

export function ModalContextProvider({ children }) {
  const router = useRouter();
  const [state, dispatch] = useImmerReducer(immerReducer, initialState);
  const {
    applyMealPlanModal,
    applyMealPlanConflictModal,
    spinner,
    ingredientModal,
    storePlanPaypalModal,
    shopIngredientsModal,
    confirmModal,
    selectMealTypeModal,
  } = state;

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {spinner.visible && <FullPageSpinner label={spinner.label} />}
        {applyMealPlanModal.visible && (
          <ApplyMealPlanModal
            title={applyMealPlanModal.title}
            total_recipes={applyMealPlanModal.total_recipes}
            total_days={applyMealPlanModal.total_days}
            onClick={applyMealPlanModal.onClick}
            onClose={() => dispatch({ type: 'hideApplyMealPlanModal' })}
          />
        )}
        {applyMealPlanConflictModal.visible && (
          <ApplyMealPlanConflictModal
            onClick={() => {
              dispatch({ type: 'hideApplyMealPlanConflictModal' });
              router.push('/my-plan');
            }}
            onClose={() => dispatch({ type: 'hideApplyMealPlanConflictModal' })}
          />
        )}
        {ingredientModal.visible && (
          <IngredientModal
            title={ingredientModal.title}
            target={ingredientModal.target}
            onClick={ingredientModal.onClick}
            onClose={() => dispatch({ type: 'hideIngredientModal' })}
          />
        )}
        {storePlanPaypalModal.visible && (
          <StorePlanPaypalModal
            id={storePlanPaypalModal.id}
            title={storePlanPaypalModal.title}
            total_recipes={storePlanPaypalModal.total_recipes}
            price={storePlanPaypalModal.price}
            total_days={storePlanPaypalModal.total_days}
            onClick={storePlanPaypalModal.onClick}
            onSuccess={storePlanPaypalModal.onSuccess}
            onClose={() => dispatch({ type: 'hideStorePlanPaypal' })}
          />
        )}
        {shopIngredientsModal.visible && (
          <ShopIngredientsModal
            title={shopIngredientsModal.title}
            cartList={shopIngredientsModal.cartList}
            onEmail={shopIngredientsModal.onEmail}
            onPrint={shopIngredientsModal.onPrint}
            onCheckout={shopIngredientsModal.onCheckout}
            onClose={() => dispatch({ type: 'hideShopIngredientsModal' })}
          />
        )}
        {confirmModal.visible && (
          <ConfirmModal
            title='Confirm Delete'
            content='Are you sure you want to delete this?'
            onClick={confirmModal.onClick}
            onClose={() => dispatch({ type: 'hideConfirmModal' })}
          />
        )}
        {selectMealTypeModal.visible && (
          <SelectMealTypeModal
            title='Select Meal Type'
            content='Are you sure you want to delete this?'
            onClose={() => dispatch({ type: 'hideSelectMealTypeModal' })}
            list={selectMealTypeModal.list}
            monthMealType={selectMealTypeModal.monthMealType}
            setMonthMealType={selectMealTypeModal.setMonthMealType}
            onClick={selectMealTypeModal.onClick}
          />
        )}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
