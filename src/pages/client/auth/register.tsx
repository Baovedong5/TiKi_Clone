import { App, Button, Divider, Form, Input, type FormProps } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { registerAPI } from "@/services/api";

type FieldType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { email, fullName, password, phone } = values;
    const res = await registerAPI(fullName, email, password, phone);
    if (res.data) {
      message.success("Đăng ký tài khoản thành công");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
    setIsSubmit(false);
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng ký tài khoản</h2>
              <Divider />
            </div>
            <Form name="form-register" onFinish={onFinish} autoComplete="off">
              <Form.Item<FieldType>
                label="Họ tên"
                name="fullName"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Họ tên không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Email không được để trống" },
                  { type: "email", message: "Email không đúng định dạng" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>

              <Divider>Hoặc</Divider>

              <p className="text text-normal" style={{ textAlign: "center" }}>
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
