import { Coupon, Fee, GiftCertificate, OrderFee, Tax, LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';

import isOrderFee from './isOrderFee';
import OrderSummaryDiscount from './OrderSummaryDiscount';
import OrderSummaryPrice from './OrderSummaryPrice';

export interface OrderSummarySubtotalsProps {
  coupons: Coupon[];
  giftCertificates?: GiftCertificate[];
  discountAmount?: number;
  isTaxIncluded?: boolean;
  taxes?: Tax[];
  fees?: Fee[] | OrderFee[];
  giftWrappingAmount?: number;
  shippingAmount?: number;
  shippingAmountBeforeDiscount?: number;
  handlingAmount?: number;
  storeCreditAmount?: number;
  subtotalAmount: number;
  onRemovedGiftCertificate?(code: string): void;
  onRemovedCoupon?(code: string): void;
  items: LineItemMap;
}

const OrderSummarySubtotals: FunctionComponent<OrderSummarySubtotalsProps> = ({
  discountAmount,
  isTaxIncluded,
  giftCertificates,
  taxes,
  fees,
  giftWrappingAmount,
  shippingAmount,
  shippingAmountBeforeDiscount,
  subtotalAmount,
  handlingAmount,
  storeCreditAmount,
  coupons,
  onRemovedGiftCertificate,
  onRemovedCoupon,
  items
}) => {
    console.log("items:",items);
  return (
    <>
      {/* check for subscription items */}
      {items.digitalItems && items.digitalItems.length >= 1 ? (
        <ol className="subscription-disclaimer">
          <li>
            One or more items in your cart are a recurring purchase. By continuing with your
            payment, you agree that your payment method will automatically be charged at the price
            and frequency listed until your term ends or you cancel. All cancellations are subject
            to the cancellation policy.
          </li>
          <li>
            You may cancel your subscription at any time by contacting customer care at
            support@alivecor.com
          </li>
        </ol>
      ) : null}
      <OrderSummaryPrice
        amount={subtotalAmount}
        className="cart-priceItem--subtotal"
        label={<TranslatedString id="cart.subtotal_text" />}
        testId="cart-subtotal"
      />

      {(coupons || []).map((coupon, index) => (
        <OrderSummaryDiscount
          amount={coupon.discountedAmount}
          code={coupon.code}
          key={index}
          label={coupon.displayName}
          onRemoved={onRemovedCoupon}
          testId="cart-coupon"
        />
      ))}

      {!!discountAmount && (
        <OrderSummaryDiscount
          amount={discountAmount}
          label={<TranslatedString id="cart.discount_text" />}
          testId="cart-discount"
        />
      )}

      {(giftCertificates || []).map((giftCertificate, index) => (
        <OrderSummaryDiscount
          amount={giftCertificate.used}
          code={giftCertificate.code}
          key={index}
          label={<TranslatedString id="cart.gift_certificate_text" />}
          onRemoved={onRemovedGiftCertificate}
          remaining={giftCertificate.remaining}
          testId="cart-gift-certificate"
        />
      ))}

      {!!giftWrappingAmount && (
        <OrderSummaryPrice
          amount={giftWrappingAmount}
          label={<TranslatedString id="cart.gift_wrapping_text" />}
          testId="cart-gift-wrapping"
        />
      )}

      <OrderSummaryPrice
        amount={shippingAmount}
        amountBeforeDiscount={shippingAmountBeforeDiscount}
        label={<TranslatedString id="cart.shipping_text" />}
        testId="cart-shipping"
        zeroLabel={<TranslatedString id="cart.free_text" />}
      />

      {!!handlingAmount && (
        <OrderSummaryPrice
          amount={handlingAmount}
          label={<TranslatedString id="cart.handling_text" />}
          testId="cart-handling"
        />
      )}

      {fees?.map((fee, index) => (
        <OrderSummaryPrice
          amount={fee.cost}
          key={index}
          label={isOrderFee(fee) ? fee.customerDisplayName : fee.displayName}
          testId="cart-fees"
        />
      ))}

      {!isTaxIncluded &&
        (taxes || []).map((tax, index) => (
          <OrderSummaryPrice amount={tax.amount} key={index} label={tax.name} testId="cart-taxes" />
        ))}

      {!!storeCreditAmount && (
        <OrderSummaryDiscount
          amount={storeCreditAmount}
          label={<TranslatedString id="cart.store_credit_text" />}
          testId="cart-store-credit"
        />
      )}
    </>
  );
};

export default memo(OrderSummarySubtotals);
