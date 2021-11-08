FROM python:3.7-slim
ENV PYTHONPATH "${PYTHONPATH}:/usr/src/api/"
RUN mkdir /usr/src/api/
COPY . /usr/src/api/
WORKDIR /usr/src/api/
EXPOSE 5000
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python", "app.py"]