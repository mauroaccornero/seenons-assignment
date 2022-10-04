import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import StopDetailView from "../StopDetailView.vue";

describe("ShopDetailView unit test", () => {
  it("Should renders name, address, comment, orders and telephone number link", () => {
    const mockShop = {
      stop_id: 1,
      name: "a random stop name",
      status: 2,
      eta: "2021-03-24T09:00:00.000Z",
      time_start: "2021-03-24T09:00:00.000Z",
      time_end: "2021-03-24T12:00:00.000Z",
      address: {
        street: "some stop street",
        house_number: "4",
        country: "japan",
        town: "tokio",
        postal_code: "asdasd",
      },
      orders: [
        {
          order_id: "000000003",
          stream_product_id: 6,
          stream_type: "sinaasappelschillen",
          quantity: 1,
          size: 20,
          status: 2,
          type: 0,
        },
      ],
      comment: "Some comment",
      telephone: "12312312",
    };

    const wrapper = mount(StopDetailView, {
      props: {
        stop: mockShop,
        stops: [mockShop, mockShop],
        lastStop: mockShop,
      },
    });

    expect(wrapper.text()).toContain(mockShop.name);
    expect(wrapper.text()).toContain(
      mockShop.address.street + " " + mockShop.address.house_number
    );
    expect(wrapper.text()).toContain(
      mockShop.address.postal_code +
        " " +
        mockShop.address.country +
        " " +
        mockShop.address.town
    );

    expect(wrapper.text()).toContain(mockShop.comment);

    expect(wrapper.text()).toContain(
      "Pickup " +
        mockShop.orders[0].quantity +
        " x " +
        mockShop.orders[0].size +
        "L " +
        mockShop.orders[0].stream_type
    );

    expect(wrapper.find("a").attributes()).toEqual({
      href: "tel:" + mockShop.telephone,
    });
  });
});
