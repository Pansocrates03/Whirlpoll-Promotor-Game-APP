-- New Report Procedure
CREATE PROCEDURE newReport
    @generadopor INT,
    @ubicacion INT,
    @motivo INT,
    @urgencia INT,
    @descripcion VARCHAR(255)
AS
BEGIN
    INSERT INTO reporte(generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion)
    VALUES             (@generadopor,1,    @ubicacion,@motivo,GETDATE(),@descripcion)
END
GO

-- Example:
-- EXEC newReport @generadopor = 1, @ubicacion = 1, @motivo = 1, @urgencia = 1, @descripcion = 'lol';
