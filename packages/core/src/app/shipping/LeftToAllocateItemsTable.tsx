import { FormikErrors } from "formik";
import React, { FunctionComponent } from "react";

import { TranslatedString } from '@bigcommerce/checkout/locale';

import { isMobileView as isMobileViewUI } from "../ui/responsive";

import { AllocateItemsModalFormValues } from "./AllocateItemsModal";
import LeftToAllocateItem from "./LeftToAllocateItem";
import { MultiShippingTableItemWithType } from "./MultishippingType";

interface LeftToAllocateItemsTableProps {
    items: MultiShippingTableItemWithType[];
    formErrors: FormikErrors<AllocateItemsModalFormValues>;
}

const LeftToAllocateItemsTable: FunctionComponent<LeftToAllocateItemsTableProps> = ({ items, formErrors }: LeftToAllocateItemsTableProps) => {
    const isMobileView = isMobileViewUI();

    return (
        <table className="table left-to-allocate-items-table">
            <thead>
                <tr>
                    <th><TranslatedString id="shipping.multishipping_left_to_allocate_items_table_item" /></th>
                    {!isMobileView && <th><TranslatedString id="shipping.multishipping_left_to_allocate_items_table_left_to_allocate" /></th>}
                    <th><TranslatedString id="shipping.multishipping_left_to_allocate_items_table_quantity" /></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <LeftToAllocateItem
                        error={formErrors[item.id.toString()]}
                        item={item}
                        key={item.id}
                    />      
                ))}
            </tbody>
        </table>
    );
}

export default LeftToAllocateItemsTable;
