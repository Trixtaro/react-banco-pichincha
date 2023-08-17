import { renderHook, act } from "@testing-library/react";
import { useTableRow } from "./useTableRow";

describe("useTableRow", () => {
  it("should toggle the value when toggleShowOptions is called", () => {
    const { result } = renderHook(() => useTableRow("an id", () => {}));

    expect(result.current.values.showOptions).toBe(false);

    act(() => {
      result.current.functions.toggleShowOptions();
    });

    expect(result.current.values.showOptions).toBe(true);
  });

  it("should call handleDelete", () => {
    const { result } = renderHook(() => useTableRow("an id", () => {}));

    act(() => {
      result.current.functions.handleDelete();
    });
  });
});
