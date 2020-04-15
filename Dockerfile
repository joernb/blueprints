FROM alpine

# WORKDIR /
# COPY file-on-host.txt .
# RUN touch file-in-image.txt
# USER uid:gid

# VOLUME /volume-mount-point
# EXPOSE 8080
# ENTRYPOINT ["/bin/sh", "-c"]
CMD ["/bin/sh", "-c"]
