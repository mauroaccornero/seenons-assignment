import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import OrderListView from "../OrderListView.vue";

describe("OrderListView unit test", () => {
  it("Should renders stream_type, quantity, size, type", async () => {
    const mockOrders = [
      {
        order_id: "000000003",
        stream_product_id: 6,
        stream_type: "sinaasappelschillen",
        quantity: 1,
        size: 20,
        status: 2,
        type: 0,
        issue: null,
      },
    ];

    const wrapper = mount(OrderListView, {
      props: {
        orders: mockOrders,
      },
    });

    expect(wrapper.text()).toContain(
      mockOrders[0].quantity +
        " x " +
        mockOrders[0].stream_type +
        " " +
        mockOrders[0].size +
        "L"
    );
    expect(wrapper.text()).toContain("Pickup");
    expect(wrapper.text()).toContain(mockOrders[0].quantity);
    expect(wrapper.findAll("button").length).toBe(4);
    expect(wrapper.findAll("button")[0].text()).toBe("-");
    expect(wrapper.findAll("button")[1].text()).toBe("+");
    expect(wrapper.findAll("button")[2].text()).toBe("Complete");
    expect(wrapper.findAll("button")[3].text()).toBe("Report issue");

    await wrapper.get("button.warning").trigger("click");

    expect(wrapper.findAll("select").length).toBe(1);
  });
});
