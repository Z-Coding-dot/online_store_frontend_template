import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch } from "@/redux/hooks";
import { clear } from "@/redux/store";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { OrderSummary } from "@/components/ui/OrderSummary";
import { PageHeader } from "@/components/layout/PageHeader";

export function Checkout() {
  const { t } = useTranslation();
  const cart = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  if (!cart.lines.length)
    return (
      <>
        <PageHeader title={t("checkout.title")} />
        <Container>
          <div className="empty-state">
            <h2>{t("checkout.empty")}</h2>
            <Link className="btn btn-primary" to="/shop">
              {t("cart.startShopping")}
            </Link>
          </div>
        </Container>
      </>
    );
  const steps = [
    t("checkout.contact"),
    t("checkout.shippingAddress"),
    t("checkout.delivery"),
    t("checkout.payment"),
    t("checkout.review"),
  ];
  const next = () => {
    if (step === steps.length) {
      dispatch(clear());
      navigate("/order-success");
    } else setStep(step + 1);
  };
  return (
    <>
      <PageHeader title={t("checkout.title")} />
      <section className="section">
        <Container>
          <div className="checkout-layout">
            <div>
              <div className="checkout-step-caption">
                <span>
                  {t("checkout.step")} {step} {t("checkout.of")} {steps.length}
                </span>
                <strong>{steps[step - 1]}</strong>
              </div>
              <div className="steps" aria-label={t("checkout.progress")}>
                {steps.map((label, index) => (
                  <div
                    className={`step ${step >= index + 1 ? "active" : ""}`}
                    key={label}
                  >
                    <span className="step-number">{index + 1}</span>
                    <span className="step-label">{label}</span>
                  </div>
                ))}
              </div>
              {step === 1 && (
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t("checkout.firstName")}</label>
                    <input className="input" required />
                  </div>
                  <div className="form-field">
                    <label>{t("checkout.lastName")}</label>
                    <input className="input" required />
                  </div>
                  <div className="form-field full">
                    <label>{t("checkout.email")}</label>
                    <input className="input" type="email" required />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="form-grid">
                  <div className="form-field full">
                    <label>{t("checkout.address")}</label>
                    <input className="input" required />
                  </div>
                  <div className="form-field">
                    <label>{t("checkout.city")}</label>
                    <input className="input" required />
                  </div>
                  <div className="form-field">
                    <label>{t("checkout.postal")}</label>
                    <input className="input" required />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <label className="option-card selected">
                    <input type="radio" defaultChecked name="delivery" />
                    <span>
                      <strong>{t("checkout.standardDelivery")}</strong>
                      <span>{t("checkout.standardDetail")}</span>
                    </span>
                  </label>
                  <label className="option-card">
                    <input type="radio" name="delivery" />
                    <span>
                      <strong>{t("checkout.expressDelivery")}</strong>
                      <span>{t("checkout.expressDetail")}</span>
                    </span>
                  </label>
                </div>
              )}
              {step === 4 && (
                <div>
                  <label
                    className={`option-card ${payment === "cod" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      name="payment"
                    />
                    <span>
                      <strong>{t("checkout.cod")}</strong>
                      <span>{t("checkout.secure")}</span>
                    </span>
                  </label>
                  <label
                    className={`option-card ${payment === "bank" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={payment === "bank"}
                      onChange={() => setPayment("bank")}
                      name="payment"
                    />
                    <span>
                      <strong>{t("checkout.bank")}</strong>
                      <span>{t("checkout.secure")}</span>
                    </span>
                  </label>
                </div>
              )}
              {step === 5 && (
                <div className="card" style={{ padding: "1.3rem" }}>
                  <h2 style={{ marginTop: 0 }}>{t("checkout.readyTitle")}</h2>
                  <p style={{ color: "var(--muted)" }}>
                    {t("checkout.readyText")} {t("checkout.secure")}
                  </p>
                </div>
              )}
              <div className="checkout-actions max-sm:flex">
                {step > 1 ? (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    {t("common.back")}
                  </Button>
                ) : (
                  <span />
                )}
                {step === steps.length ? (
                  <Button variant="accent" onClick={next}>
                    {t("checkout.placeOrder")}
                  </Button>
                ) : (
                  <Button onClick={next}>{t("common.continue")}</Button>
                )}
              </div>
            </div>
            <OrderSummary checkout />
          </div>
        </Container>
      </section>
    </>
  );
}
