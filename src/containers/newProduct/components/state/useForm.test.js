import { act, render, renderHook } from "@testing-library/react";
import { transformDate, getTwoDigitsNumber, useForm } from "./useForm";
import Router, { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
}));

describe("getTwoDigitsNumber", () => {
  it("should return two digits", () => {
    expect(getTwoDigitsNumber(9)).toBe("09");
    expect(getTwoDigitsNumber(10)).toBe("10");
  });
});

describe("transformDate", () => {
  it("should transformDate convert date into string", () => {
    const date = new Date();

    expect(transformDate(date)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("useForm", () => {
  const wrapper = ({ children, initialEntries = ["/"] }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useParams").mockReturnValue({});
  });

  it("should useForm to clear data when handleRestart is called", () => {
    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    act(() => {
      result.current.functions.handleRestart();
    });

    expect(result.current.values.id).toBe("");
    expect(result.current.values.name).toBe("");
    expect(result.current.values.logo).toBe("");
    expect(result.current.values.description).toBe("");
  });

  it("should useForm to be new mode when params has no field id", () => {
    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    expect(result.current.values.mode).toBe("new");
  });

  it("should change values when onChange function is called", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(""),
    }));

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    expect(result.current.values.validForm).toBe(false);

    [
      { name: "id", value: "an id" },
      { name: "nombre", value: "a name" },
      { name: "descripcion", value: "a description" },
      { name: "logo", value: "a logo URL" },
      {
        name: "fecha_liberacion",
        value: "2040-10-22",
      },
      {
        name: "fecha_liberacion",
        value: "2010-10-22",
      },
      {
        name: "random name",
        value: "random value",
      },
    ].forEach((values) => {
      act(() => {
        result.current.functions.handleChange({ target: { ...values } }, true);
      });
    });

    rerender();

    expect(result.current.values.id).toBe("an id");
    expect(result.current.values.name).toBe("a name");
    expect(result.current.values.description).toBe("a description");

    expect(result.current.values.validForm).toBe(true);
  });

  it("should saveProducts return a 200 status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.saveProducts();
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });

  it("should saveProducts return an error status", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => ({
      status: 400,
      json: Promise.resolve({}),
    }));

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.saveProducts();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should saveProducts throw an error", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({}));

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.saveProducts();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should updateProduct return a 200 status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));

    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "abc",
    });

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    rerender();

    expect(result.current.values.mode).toBe("edit");

    await act(async () => {
      await result.current.functions.handleSubmit({
        preventDefault: jest.fn(),
      });
    });

    expect(mockedNavigate).toHaveBeenCalled();
  });

  it("should updateProduct return a 400 status", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 400,
      json: Promise.resolve({}),
    }));

    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "abc",
    });

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    rerender();

    expect(result.current.values.mode).toBe("edit");

    await act(async () => {
      await result.current.functions.handleSubmit({
        preventDefault: jest.fn(),
      });
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should updateProduct throw an error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject({}));

    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "abc",
    });

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    rerender();

    expect(result.current.values.mode).toBe("edit");

    await act(async () => {
      await result.current.functions.handleSubmit({
        preventDefault: jest.fn(),
      });
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should validateId finish if id length is less than 3", () => {
    const spy = jest.spyOn(global, "fetch");
    jest.spyOn(Router, "useParams").mockReturnValue({});

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    result.current.functions.validateId("a1");

    expect(spy).not.toHaveBeenCalled();
  });

  it("should validateId continue if id length is 3 or greater when id is invalid", async () => {
    const spy = jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      text: () => Promise.resolve("true"),
    }));
    jest.spyOn(Router, "useParams").mockReturnValue({});

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.validateId("aaa111");
    });

    expect(result.current.values.invalidId).toBe(true);

    expect(spy).toHaveBeenCalled();
  });

  it("should validateId continue if id length is 3 or greater when id is valid", async () => {
    const spy = jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      text: () => Promise.resolve("false"),
    }));
    jest.spyOn(Router, "useParams").mockReturnValue({});

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.validateId("aaa111");
    });

    expect(result.current.values.invalidId).toBe(false);

    expect(spy).toHaveBeenCalled();
  });

  it("should validateId continue if id length is 3 or greater when we get an error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => Promise.reject({}));
    jest.spyOn(Router, "useParams").mockReturnValue({});

    const { result } = renderHook(() => useForm(), {
      wrapper,
    });

    await act(async () => {
      await result.current.functions.validateId("aaa111");
    });
  });

  it("should set values from location state when is in edit mode", () => {
    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "random_id_1",
    });
    jest.spyOn(Router, "useLocation").mockReturnValue({
      state: {
        name: "a name",
        description: "a description",
        logo: "a logo URL",
        releaseDate: new Date("2023-10-10"),
        reviewDate: new Date("2024-10-10"),
      },
    });

    const { result, rerender } = renderHook(() => useForm(), {
      wrapper,
    });

    rerender();

    expect(result.current.values.name).toBe("a name");
    expect(result.current.values.description).toBe("a description");
    expect(result.current.values.logo).toBe("a logo URL");
    expect(result.current.values.releaseDate).toBe("2023-10-09");
    expect(result.current.values.reviewDate).toBe("2024-10-09");
  });

  it("should handleSubmit saveProducts when is in new mode", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));
    jest.spyOn(Router, "useLocation").mockReturnValue({
      state: null,
    });
    jest.spyOn(Router, "useParams").mockReturnValue({});

    const { result } = renderHook(() => useForm(), { wrapper });

    act(() => {
      result.current.functions.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.values.mode).toBe("new");
  });

  it("should handleSubmit saveProducts when is in edit mode", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => ({
      status: 200,
      json: Promise.resolve({}),
    }));
    jest.spyOn(Router, "useLocation").mockReturnValue({
      state: {
        name: "a name",
        description: "a description",
        logo: "a logo URL",
        releaseDate: new Date("2023-10-10"),
        reviewDate: new Date("2024-10-10"),
      },
    });

    jest.spyOn(Router, "useParams").mockReturnValue({
      id: "abc123",
    });

    const { result } = renderHook(() => useForm(), { wrapper });

    act(() => {
      result.current.functions.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.values.mode).toBe("edit");
  });
});
