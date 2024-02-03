import { Stack } from '@/components';
import './practice-pizza.css';
import { useId, useState } from 'react';

function Exercise() {
  return (
    <>
      <FormControlExample />
    </>
  );
}

// 체크박스랑 이미지랑 어떤식으로 연결을 할것인지 고민
// useState 에 있는 데이터 값을 잘 건들이면됨
// 연결해가지고 눌렀을때 false -> true , true 면 'block', 'hidden' 으로!

/* -------------------------------------------------------------------------- */

function FormControlExample() {
  return (
    <>
      <div className="m-auto font-serif">
        <h1 className="text-[6rem] font-extrabold text-pink-600 text-center mt-[12rem] drop-shadow-2xl ">
          jin's icecream shop
        </h1>
        <h2 className="text-[2rem] font-semibold text-pink-400 text-center ">
          which flavor and toppings do you want?
        </h2>
      </div>
      <Form />
    </>
  );
}

const ICECREAM = {
  types: 'strawberry, chocolate, vanilla'.split(', '),
  toppings: 'cherry, whip-cream, choco-dip strawberry, chocolate piece'.split(
    ', '
  ),
};

const INITIAL_ORDER = {
  type: ICECREAM.types[0],
  isAllToppings: false,
  toppings: [],
};

// Design is All. All is Design.

function Form() {
  // 주문 폼 상태(like a snapshot) 선언
  const [orderState, setOrderState] = useState(INITIAL_ORDER);

  const handleChangeIceCreamType = (e) => {
    const { value } = e.target;

    const nextOrderState = {
      ...orderState,
      type: value,
    };

    setOrderState(nextOrderState);
  };

  const handleChangeAllToppings = (e) => {
    const { checked } = e.target;

    const nextOrderState = {
      ...orderState,
      isAllToppings: checked,
      toppings: checked ? ICECREAM.toppings : [],
    };

    setOrderState(nextOrderState);
  };

  const handleChangeIceCreamToppings = (e) => {
    const { value: topping, checked: isChecked } = e.target;

    let nextToppings = [];

    // 사용자가 눌렀을 때 체크되었다
    if (isChecked) {
      // 토핑 추가
      nextToppings = [...orderState.toppings, topping];
    } else {
      // 토핑 삭제
      nextToppings = orderState.toppings.filter((t) => t !== topping);
    }

    const hasFullFilledToppings =
      nextToppings.length === ICECREAM.toppings.length;

    const nextOrderState = {
      ...orderState,
      toppings: nextToppings,
      isAllToppings: hasFullFilledToppings,
    };

    setOrderState(nextOrderState);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(orderState);
  };

  const handleCancel = () => {
    setOrderState(INITIAL_ORDER);
  };

  return (
    <div className="flex flex-row-reverse justify-between gap-40">
      <div className="">
        <img
          src="../../public/practice-image/pngegg (1).png"
          alt=""
          className="w-[20rem] mt-6"
        />
        <img
          src="../../public/practice-image/pngegg (2).png"
          alt="vanilla flavor"
          className="w-[20rem] absolute mt-[-29rem] ${orderState.type === 'vanilla' ? 'block' : 'hidden'} "
        />
        <img
          src="../../public/practice-image/pngegg (3).png"
          alt="cherry topping"
          className="w-[2.8rem] absolute mt-[-27.5rem] ml-[8.5rem] ${orderState.toppings.included('cherry') ? 'block' : 'hidden'} "
        />
      </div>

      <form
        onSubmit={handleOrder}
        onReset={handleCancel}
        className=" text-pink-600 ml-[29rem] mt-5"
      >
        <div className="font-serif flex flex-col justify-center gap-6">
          <div className="text-center">
            <h3 className="text-[1.5rem] text-pink-600 font-bold mb-2">
              Choose a flavor first
            </h3>
            {ICECREAM.types.map((iceCreamType) => (
              <FormChecker
                name="type"
                key={iceCreamType}
                value={iceCreamType}
                checked={orderState.type === iceCreamType}
                onChange={handleChangeIceCreamType}
              >
                {iceCreamType}
              </FormChecker>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-[1.5rem] text-pink-600 font-bold mb-2">
              {' '}
              Choose toppings! <br />
              Add a lot!
            </h3>
            <FormChecker
              checkbox
              checked={orderState.isAllToppings}
              onChange={handleChangeAllToppings}
            >
              ALL
            </FormChecker>
            {ICECREAM.toppings.map((topping) => (
              <FormChecker
                name="topping"
                checkbox
                key={topping}
                value={topping}
                checked={orderState.toppings.includes(topping)}
                onChange={handleChangeIceCreamToppings}
              >
                {topping}
              </FormChecker>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-[8rem] mt-12 justify-center">
          <button
            type="submit"
            className=" border border-double border-pink-600 w-[5rem] hover:bg-pink-400 hover:text-white"
            onClick={handleOrder}
          >
            order
          </button>
          <button
            type="reset"
            className=" border border-double border-pink-400 w-[5rem] hover:bg-pink-400 hover:text-white"
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FormChecker({
  as: Component = 'div',
  checkbox = false,
  children,
  ...restProps
}) {
  const id = useId();
  const type = checkbox ? 'checkbox' : 'radio';

  return (
    <Component>
      <input type={type} id={id} {...restProps} />
      <label htmlFor={id}>{children}</label>
    </Component>
  );
}

export default Exercise;
